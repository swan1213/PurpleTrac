import axios from 'axios'
import store from '@/store'
import jwt from 'jsonwebtoken'
import mock from '@/@fake-db/mock'
import { serverUri } from '@/config'
import { getUserData } from "@/auth/utils";

const data = {
  users: [],
}

const company = getUserData() ? (getUserData().role === 'Super Admin' ? 0 : getUserData().company_id) : 0;

axios.get(`${serverUri}/users/alluser/${company}`).then(res => {
  res.data.map(item => {
    let userPermissions = [];

    axios.get(`${serverUri}/users/permission/${item.id}`).then(res => {

      if (res.data.length) {
          res.data.map(permission => {
            userPermissions.push({ action: 'read', subject: permission.action })
          })
      }
      else if (item.role === 1) {
          userPermissions.push({ action: 'manage', subject: 'all' })
      }
    })

    if (!(userPermissions.length === 1 && userPermissions[0].action === 'manage')) {
        userPermissions.push({ action: 'read', subject: 'manage-utilities' }, { action: 'read', subject: 'manage-dashboard' })
    }

    if (item.status === 'Active') 
    {
      data.users.push({
        id: item.id,
        fullName: item.name,
        username: item.name,
        password: item.password,
        // eslint-disable-next-line global-require
        avatar: item.photo,
        email: item.email,
        role: item.role_name,
        company_id: item.company_id,
        ability: userPermissions,
        extras: {
          eCommerceCartItemsCount: 5,
        },
      })
    }
  })

  store.commit('auth/addAuth', data.users)
})

// ! These two secrets shall be in .env file and not in any other file
const jwtConfig = {
  secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
  refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767',
  expireTime: '10m',
  refreshTokenExpireTime: '10m',
}

mock.onPost('/jwt/login').reply(request => {
  const { email, password } = JSON.parse(request.data)

  let error = {
    email: ['Something went wrong'],
  }
  const user = store.state.auth.authUserList.find(u => u.email === email)

  if (user) {
    try {
      const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
      const refreshToken = jwt.sign({ id: user.id }, jwtConfig.refreshTokenSecret, {
        expiresIn: jwtConfig.refreshTokenExpireTime,
      })

      const userData = { ...user }

      delete userData.password

      const response = {
        userData,
        accessToken,
        refreshToken,
      }

      return [200, response]
    } catch (e) {
      error = e
    }
  } else {
    error = {
      email: ['Email or Password is Invalid'],
    }
  }

  return [400, { error }]
})

mock.onPost('/jwt/register').reply(request => {
  const { username, email, password } = JSON.parse(request.data)

  // If not any of data is missing return 400
  if (!(username && email && password)) return [400]

  const isEmailAlreadyInUse = store.state.auth.authUserList.find(user => user.email === email)
  const isUsernameAlreadyInUse = store.state.auth.authUserList.find(user => user.username === username)

  const error = {
    password: !password ? ['Please enter password'] : null,
    email: (() => {
      if (!email) return ['Please enter your email.']
      if (isEmailAlreadyInUse) return ['This email is already in use.']
      return null
    })(),
    username: (() => {
      if (!username) return ['Please enter your username.']
      if (isUsernameAlreadyInUse) return ['This username is already in use.']
      return null
    })(),
  }

  if (!error.username && !error.email) {
    const userData = {
      email,
      password,
      username,
      fullName: '',
      avatar: null,
      role: 'user',
      ability: [
        {
          action: 'manage',
          subject: 'all',
        },
      ],
    }

    // Add user id
    const { length } = data.users
    let lastIndex = 0
    if (length) {
      lastIndex = data.users[length - 1].id
    }
    userData.id = lastIndex + 1

    data.users.push(userData)

    const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })

    const user = { ...userData }
    delete user.password
    const response = {
      userData: user,
      accessToken,
    }

    return [200, response]
  }
  return [400, { error }]
})

mock.onPost('/jwt/refresh-token').reply(request => {
  const { refreshToken } = JSON.parse(request.data)

  try {
    const { id } = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret)

    const userData = { ...store.state.auth.authUserList.find(user => user.id === id) }

    const newAccessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
    const newRefreshToken = jwt.sign({ id: userData.id }, jwtConfig.refreshTokenSecret, {
      expiresIn: jwtConfig.refreshTokenExpireTime,
    })

    delete userData.password
    const response = {
      userData,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }

    return [200, response]
  } catch (e) {
    const error = 'Invalid refresh token'
    return [401, { error }]
  }
})
