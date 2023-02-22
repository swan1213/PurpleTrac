import axios from 'axios'
import store from '@/store'
import mock from '@/@fake-db/mock'
import { serverUri } from '@/config'
import { getUserData } from "@/auth/utils";
import { paginateArray, sortCompare } from '@/@fake-db/utils'

/* eslint-disable global-require */
let data = {
  users: []
}

axios.get(`${serverUri}/users/alluser/0`).then(res => {

  res.data.map(item => {
    data.users.push({
      id: item.id,
      fullName: item.name,
      email: item.email,
      company: item.company_name,
      companyID: item.companyID,
      role: item.role_name,
      username: item.name,
      status: item.status,
    })
  })

  store.commit('users/addUser', data.users);
})
/* eslint-enable */

// ------------------------------------------------
// GET: Return Users
// ------------------------------------------------
mock.onGet('/apps/user/users').reply(config => {
  
const company = getUserData() ? (getUserData().role === 'Super Admin' ? 0 : getUserData().company_id) : 0;

  // eslint-disable-next-line object-curly-newline
  const {
    q = '',
    perPage = 10,
    page = 1,
    sortBy = 'id',
    sortDesc = false,
    role = null,
    plan = null,
    status = null,
  } = config.params
  /* eslint-enable */

  const queryLowered = q.toLowerCase()

  let array = store.state.users.userList;

  if (company) {
    array = store.state.users.userList.filter(user => user.companyID === company )
  }

  const filteredData = array.filter(
    user =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      (user.username.toLowerCase().includes(queryLowered) || user.fullName.toLowerCase().includes(queryLowered)) &&
      user.role === (role || user.role) &&
      user.company === (plan || user.company) &&
      user.status === (status || user.status),
  )

  /* eslint-enable  */

  const sortedData = filteredData.sort(sortCompare(sortBy))
  if (sortDesc) sortedData.reverse()

  return [
    200,
    {
      users: paginateArray(sortedData, perPage, page),
      total: filteredData.length,
    },
  ]
})

// ------------------------------------------------
// POST: Add new user
// ------------------------------------------------
mock.onPost('/apps/user/users').reply(config => {
  // Get event from post data
  const { user } = JSON.parse(config.data)

  // Assign Status
  user.status = 'Active'

  const roles = [ 'Super Admin', 'Admin', 'User' ]
  const companies = [ 'Ground Force Trucking', 'OWL LLC' ]

  let newUser = {
    id: Number(store.state.users.userList[store.state.users.userList.length - 1].id) + 1,
    fullName: user.fullName,
    username: user.fullName,
    email: user.email,
    company: companies.indexOf(user.company) + 1,
    role: roles.indexOf(user.role) + 1,
    status: user.status,
    password: user.password
  }

  axios.post(`${serverUri}/users/saveuser`, newUser).then(res => {
    console.log('a user is added in database.');
  });
  
  newUser.company = user.company;
  newUser.role = user.role;
  
  store.state.users.userList.push(newUser);
  store.commit('users/addUser', store.state.users.userList)
  
  return [201, { user }]
})

// ------------------------------------------------
// POST: Update user
// ------------------------------------------------
mock.onPost('/apps/user/update').reply(config => {
  // Get event from post data
  const { user } = JSON.parse(config.data)

  // Assign Status

  const roles = [ 'Super Admin', 'Admin', 'User' ]
  const companies = [ 'Ground Force Trucking', 'OWL LLC' ]

  let newUser = {
    id: user.id,
    fullName: user.fullName,
    username: user.fullName,
    email: user.email,
    company: companies.indexOf(user.company) + 1,
    role: roles.indexOf(user.role) + 1,
    status: user.status,
    password: user.password
  }

  axios.post(`${serverUri}/users/updateuser/${user.id}`, newUser).then(res => {
    console.log('a user is added in database.');
  });
  
  store.state.users.userList.map(item => {
    if (item.id === user.id) {
      item.fullName = user.fullName,
      item.username = user.fullName,
      item.email = user.email,
      item.company = user.company,
      item.role = user.role,
      item.status = user.status,
      item.password = user.password
    }
  });

  return [200]
})

// ------------------------------------------------
// POST: Delete user
// ------------------------------------------------
mock.onDelete(/\/apps\/user\/users\/\d+/).reply(config => {

  // Get event id from URL
  let userId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  userId = Number(userId)

  axios.delete(`${serverUri}/users/deleteuser/${userId}`).then(res => {
    console.log('The user is deleted in database.');
  });

  store.state.users.userList.map((item, index) => {
    if (item.id === userId) {
      store.state.users.userList.splice(index, 1);
      store.commit('users/addUser', store.state.users.userList)
    }
  })

  return [200]
})

// ------------------------------------------------
// GET: Return Single User
// ------------------------------------------------
mock.onGet(/\/apps\/user\/users\/\d+/).reply(config => {
  // Get event id from URL
  let userId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  userId = Number(userId)

  const userIndex = store.state.users.userList.findIndex(e => e.id === userId)
  const user = store.state.users.userList[userIndex]

  if (user) return [200, user]
  return [404]
})