import mock from '@/@fake-db/mock'
import axios from 'axios'
import { serverUri } from '@/config'
// eslint-disable-next-line object-curly-newline
import { paginateArray, sortCompare, randomDate, getRandomInt } from '@/@fake-db/utils'

const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
const nextWeek = new Date(nextDay.getTime() + 7 * 24 * 60 * 60 * 1000)

/* eslint-disable global-require */
const data = {
  products: [],
  userWishlist: [
    { id: 1, productId: 26 },
    { id: 2, productId: 23 },
    { id: 3, productId: 11 },
    { id: 4, productId: 10 },
    { id: 5, productId: 5 },
    { id: 6, productId: 8 },
    { id: 7, productId: 9 },
    { id: 8, productId: 13 },
    { id: 9, productId: 17 },
  ],
  userCart: [
    { id: 1, productId: 27, qty: 1 },
    { id: 2, productId: 21, qty: 1 },
    { id: 3, productId: 26, qty: 1 },
    { id: 4, productId: 25, qty: 1 },
    { id: 5, productId: 23, qty: 1 },
  ],
  updateData: {
    id: null,
    name: null,
    url: null,
    description: null,
    rank: null
  }
}

axios.get(`${serverUri}/utilities/allsites`).then(res => {
  data.products = res.data.map(item => {
    return {...item, ranking: item.rank === 'high' ? 1 : item.rank === 'normal' ? 2 : 3}
  })
});
/* eslint-enable */

// ------------------------------------------------
// GET: Return products
// ------------------------------------------------
mock.onGet('/apps/ecommerce/products').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', sortBy = 'featured', perPage = 9, page = 1 } = config.params

  const queryLowered = q.toLowerCase()

  let filteredData = data.products.filter(product => product.name.toLowerCase().includes(queryLowered))

  filteredData = filteredData.filter(item => {
    if (sortBy === 'none') {
      return 1
    } else {
      return item.rank === sortBy
    }
  })

  const sortByKey = 'ranking'

  const sortedData = filteredData.sort(sortCompare(sortByKey))

  const paginatedData = JSON.parse(JSON.stringify(paginateArray(sortedData, perPage, page)))

  paginatedData.forEach(product => {
    /* eslint-disable no-param-reassign */
    product.isInWishlist = data.userWishlist.findIndex(p => p.productId === product.id) > -1
    product.isInCart = data.userCart.findIndex(p => p.productId === product.id) > -1
    /* eslint-enable */
  })

  return [
    200,
    {
      products: paginatedData,
      total: filteredData.length,
      userWishlist: data.userWishlist,
      userCart: data.userCart,
    },
  ]
})

// ------------------------------------------------
// GET: Return Single Product
// ------------------------------------------------
mock.onGet(/\/apps\/ecommerce\/products\/\d+/).reply(config => {
  // Get product id from URL
  let productId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  productId = Number(productId)

  const productIndex = data.products.findIndex(p => p.id === productId)
  const product = data.products[productIndex]

  if (product) {
    // Add data of wishlist and cart
    product.isInWishlist = data.userWishlist.findIndex(p => p.productId === product.id) > -1
    product.isInCart = data.userCart.findIndex(p => p.productId === product.id) > -1

    // * Add Dummy data for details page
    product.colorOptions = ['primary', 'success', 'warning', 'danger', 'info']

    return [200, { product }]
  }
  return [404]
})

// ------------------------------------------------
// GET: Return Wishlist Products
// ------------------------------------------------
mock.onGet('/apps/ecommerce/wishlist').reply(() => {
  const products = data.userWishlist.map(wishlistProduct => {
    const product = data.products.find(p => p.id === wishlistProduct.productId)
    product.isInCart = data.userCart.findIndex(p => p.productId === wishlistProduct.productId) > -1
    return product
  })

  return [200, { products }]
})

// ------------------------------------------------
// GET: Return Cart Products
// ------------------------------------------------
mock.onGet('/apps/ecommerce/cart').reply(() => {
  const products = data.userCart.map(cartProduct => {
    const product = data.products.find(p => p.id === cartProduct.productId)

    // Other data
    product.isInWishlist = data.userWishlist.findIndex(p => p.productId === cartProduct.productId) > -1
    product.qty = cartProduct.qty
    product.shippingDate = randomDate(nextDay, nextWeek)
    product.offers = getRandomInt(1, 4)
    product.discountPercentage = getRandomInt(3, 20)

    return product
  })

  return [200, { products }]
})

// ------------------------------------------------
// POST: Add Item in user Cart
// ------------------------------------------------
mock.onPost('/apps/ecommerce/cart').reply(config => {
  // Get product from post data
  const { productId } = JSON.parse(config.data)

  const { length } = data.userCart
  let lastId = 0
  if (length) lastId = data.userCart[length - 1].i

  data.userCart.push({
    id: lastId + 1,
    productId,
    qty: 1,
  })

  return [201]
})

// ------------------------------------------------
// DELETE: Remove Item from user Cart
// ------------------------------------------------
mock.onDelete(/\/apps\/ecommerce\/cart\/\d+/).reply(config => {
  // Get product id from URL
  let productId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  productId = Number(productId)

  const productIndex = data.userCart.findIndex(i => i.productId === productId)
  if (productIndex > -1) data.userCart.splice(productIndex, 1)

  return [200]
})

// ------------------------------------------------
// POST: Add Item in user Wishlist
// ------------------------------------------------
mock.onPost('/apps/ecommerce/wishlist').reply(config => {
  // Get product from post data
  const { productId } = JSON.parse(config.data)

  if (productId.id >= 0) {
    data.updateData = {
      id: productId.id,
      name: productId.name,
      url: productId.url,
      description: productId.description,
      rank: productId.rank
    }
  } else {  
    if (productId.type === 'update') {
      data.products.map(item => {
        if (item.id === data.updateData.id) {
          item.name = productId.name;
          item.url = productId.url;
          item.description = productId.description;
          item.rank = productId.rank;
          
          axios.post(`${serverUri}/utilities/updatesites`, item).then(res => {
            if (res) console.log('The external link is updated')
          })
        }
      })
    } else {
      data.products.push(
        { id: null,
          name: productId.name,
          url: productId.url,
          description: productId.description,
          rank: productId.rank, ranking: productId.rank === 'high' ? 1 : productId.rank === 'normal' ? 2 : 3}
      )

      axios.post(`${serverUri}/utilities/insertsites`, productId).then(res => {
        if (data.products[data.products.length - 1].id == null) 
          data.products[data.products.length - 1].id = res.data[0].id
      })
    }
  }
  
  return [201]
})

// ------------------------------------------------
// DELETE: Remove Item from user Wishlist
// ------------------------------------------------
mock.onDelete(/\/apps\/ecommerce\/wishlist\/\d+/).reply(config => {
  // Get product id from URL
  let productId = config.url.substring(config.url.lastIndexOf('/') + 1)
  // Convert Id to number
  productId = Number(productId)

  const productIndex = data.products.findIndex(i => i.id === productId)
  if (productIndex > -1) data.products.splice(productIndex, 1)

  axios.delete(`${serverUri}/utilities/deletesites/${productId}`).then(res => {
    console.log('External Link is deleted: id - ', productId)
  })

  return [200, {
    products: data.products
  }]
})
