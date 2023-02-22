import { ref } from '@vue/composition-api'
import store from '@/store'

export const useShopFiltersSortingAndPagination = () => {
  const filters = ref({
    q: '',
    brands: [],
    page: 1,
    perPage: 9,
  })

  const filterOptions = {
    priceRangeDefined: [],
    categories: [],
    brands: [],
  }

  // Sorting
  const sortBy = ref({ text: 'None', value: 'none' })
  const sortByOptions = [
    { text: 'None', value: 'none' },
    { text: 'Low', value: 'low' },
    { text: 'Normal', value: 'normal' },
    { text: 'High', value: 'high' },
  ]

  return {
    // Filter
    filters,
    filterOptions,

    // Sort
    sortBy,
    sortByOptions,
  }
}

export const useShopUi = () => {
  const itemView = 'grid-view'
  const itemViewOptions = [
    { icon: 'GridIcon', value: 'grid-view' },
    { icon: 'ListIcon', value: 'list-view' },
  ]

  // Pagination count <= required by pagination component
  const totalProducts = ref(null)

  return {
    itemView,
    itemViewOptions,
    totalProducts,
  }
}

export const useShopRemoteData = () => {
  const products = ref([])
  const fetchProducts = (...args) => store.dispatch('app-ecommerce/fetchProducts', ...args)

  return {
    products,
    fetchProducts,
  }
}
