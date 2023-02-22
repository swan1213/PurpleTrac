<template>
<div style="height: inherit">

    <!-- ECommerce Header -->
    <section id="ecommerce-header">
        <div class="row">
            <div class="col-sm-12">
                <div class="ecommerce-header-items">
                    <div class="result-toggler">
                        <feather-icon icon="MenuIcon" class="d-block d-lg-none" size="21" @click="mqShallShowLeftSidebar = true" />
                        <div class="search-results">
                            {{ totalProducts }} results found
                        </div>
                    </div>
                    <div class="view-options d-flex">
                        <b-button class="mr-1" variant="outline-primary" v-b-toggle.sidebar-right @click="onInsert">
                            <feather-icon icon="PlusIcon" class="mr-50" />
                            <span>Add</span>
                        </b-button>

                        <!-- Sort Button -->
                        <b-dropdown v-ripple.400="'rgba(113, 102, 240, 0.15)'" :text="sortBy.text" right variant="outline-primary">
                            <b-dropdown-item v-for="sortOption in sortByOptions" :key="sortOption.value" @click="sortBy=sortOption">
                                {{ sortOption.text }}
                            </b-dropdown-item>
                        </b-dropdown>

                        <!-- Item View Radio Button Group  -->
                        <!-- <b-form-radio-group v-model="itemView" class="ml-1 list item-view-radio-group" buttons size="sm" button-variant="outline-primary">
                            <b-form-radio v-for="option in itemViewOptions" :key="option.value" :value="option.value">
                                <feather-icon :icon="option.icon" size="18" />
                            </b-form-radio>
                        </b-form-radio-group> -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Overlay -->
    <!-- <div class="body-content-overlay" /> -->

    <!-- Searchbar -->
    <div class="ecommerce-searchbar mt-1">
        <b-row>
            <b-col cols="12">
                <b-input-group class="input-group-merge">
                    <b-form-input v-model="filters.q" placeholder="Search Websites" class="search-product" />
                    <b-input-group-append is-text>
                        <feather-icon icon="SearchIcon" class="text-muted" />
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </div>

    <!-- Prodcuts -->
    <section :class="itemView">
        <b-card v-for="product in products" :key="product.id" class="ecommerce-card" no-body>

            <!-- Product Details -->
            <b-card-body>
                <div class="item-wrapper">
                    <div>
                        <h6 class="item-price">
                            <b-badge :variant="rankIndex.filter(item => item.key === product.rank)[0].color">
                                {{ product.rank }}
                            </b-badge>
                        </h6>
                    </div>
                </div>
                <h6 class="item-name">
                    <a class="text-body" :href="product.url" target="_blank">
                        {{ product.name }}
                    </a>
                    <b-card-text class="item-company">
                        <b-link class="ml-20">
                            {{ product.url }}
                        </b-link>
                    </b-card-text>
                </h6>
                <b-card-text class="item-description">
                    {{ product.description }}
                </b-card-text>
            </b-card-body>

            <!-- Product Actions -->
            <div class="item-options text-center">
                <div class="item-wrapper">
                    <div class="item-cost">
                        <h4 class="item-price">
                            {{ product.url }}
                        </h4>
                    </div>
                </div>
                <b-button variant="light" tag="a" class="btn-wishlist" @click="onRemove(product)">
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span>Remove</span>
                </b-button>
                <b-button variant="primary" tag="a" class="btn-cart" v-b-toggle.sidebar-right @click="onUpdate(product)">
                    <!-- <feather-icon icon="ShoppingCartIcon" class="mr-50" /> -->
                    <span>Update</span>
                </b-button>
            </div>
        </b-card>
    </section>

    <!-- Pagination -->
    <section>
        <b-row>
            <b-col cols="12">
                <b-pagination v-model="filters.page" :total-rows="totalProducts" :per-page="filters.perPage" first-number align="center" last-number prev-class="prev-item" next-class="next-item">
                    <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                    </template>
                    <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                    </template>
                </b-pagination>
            </b-col>
        </b-row>
    </section>

    <!-- Sidebar -->
    <!-- <portal to="content-renderer-sidebar-detached-left">
        <shop-left-filter-sidebar :filters="filters" :filter-options="filterOptions" :mq-shall-show-left-sidebar.sync="mqShallShowLeftSidebar" />
    </portal> -->

    <b-sidebar id="sidebar-right" sidebar-class="sidebar-lg" bg-variant="white" right backdrop shadow>
        <div class="sidebar-content">
            <!-- basic -->
            <b-form-group label="Name" label-for="basicInput">
                <b-form-input id="name" placeholder="Enter Name" v-model="linkname" />
            </b-form-group>

            <b-form-group label="Url" label-for="url">
                <b-form-input id="url" placeholder="Enter Url" v-model="url" />
            </b-form-group>

            <b-form-group label="Rank" label-for="rank">
                <v-select v-model="selected" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="options" />
            </b-form-group>

            <b-form-group label="Description" label-for="desc">
                <b-form-textarea id="textarea-default" placeholder="Enter Description" rows="3" v-model="description" />
            </b-form-group>

            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="onSave">
                Save Link
            </b-button>

        </div>
    </b-sidebar>
</div>
</template>

<script>
import {
    BDropdown,
    BDropdownItem,
    BFormRadioGroup,
    BFormRadio,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BCard,
    BCardBody,
    BLink,
    BImg,
    BCardText,
    BButton,
    BPagination,
    BBadge,
    BSidebar,
    VBToggle,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import {
    watch
} from '@vue/composition-api'
import {
    useResponsiveAppLeftSidebarVisibility
} from '@core/comp-functions/ui/app'
import ShopLeftFilterSidebar from './ECommerceShopLeftFilterSidebar.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
    useShopFiltersSortingAndPagination,
    useShopUi,
    useShopRemoteData
} from './useECommerceShop'
import {
    useEcommerceUi
} from '../useEcommerce'
import vSelect from 'vue-select'

export default {
    directives: {
        Ripple,
    },
    components: {
        // BSV
        BDropdown,
        BDropdownItem,
        BFormRadioGroup,
        BFormRadio,
        BRow,
        BCol,
        BBadge,
        BInputGroup,
        BInputGroupAppend,
        BFormInput,
        BCard,
        BCardBody,
        BLink,
        BImg,
        BCardText,
        BButton,
        BPagination,
        BSidebar,
        VBToggle,
        BFormGroup,
        BFormTextarea,
        vSelect,

        // SFC
        ShopLeftFilterSidebar,
        ToastificationContent
    },
    directives: {
        'b-toggle': VBToggle,
        Ripple,
    },
    data() {
        return {
            rankIndex: [{
                    key: 'low',
                    color: 'light-primary'
                },
                {
                    key: 'normal',
                    color: 'light-info'
                },
                {
                    key: 'high',
                    color: 'light-danger'
                }
            ],
            options: [{
                    title: 'low'
                },
                {
                    title: 'normal'
                },
                {
                    title: 'high'
                }
            ],
            selected: {
                title: 'low'
            },
            linkname: '',
            url: '',
            description: '',
            type: null
        }
    },
    methods: {
        onSave: async function () {

            const link = {
                name: this.linkname,
                url: this.url,
                rank: this.selected.title,
                description: this.description,
                type: this.type
            }
            this.type = null;

            await this.updateExternalLinks(link)

            await this.fetchShopProducts();


            if (this.type === 'update')
                this.showToast('success', 'Success', 'A External link is updated.')
            else
                this.showToast('success', 'Success', 'A External link is added.')
        },
        onRemove: function (product) {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ml-1',
                },
                buttonsStyling: false,
            }).then(result => {
                if (result.value) {
                    this.toggleProductInWishlist(product);

                    this.fetchShopProducts()

                    this.$swal({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        customClass: {
                            confirmButton: 'btn btn-success',
                        },
                    })
                }
            })
        },
        onInsert: function () {
            this.type = 'insert';
        },
        onUpdate: function (product) {
            this.type = 'update'
            this.updateExternalLinks(product)
        },
        showToast(variant, title, text) {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: title,
                    icon: 'BellIcon',
                    text: text,
                    variant,
                },
            })
        },
    },
    setup() {
        const {
            filters,
            filterOptions,
            sortBy,
            sortByOptions,
        } = useShopFiltersSortingAndPagination()

        const {
            handleCartActionClick,
            toggleProductInWishlist,
            updateExternalLinks
        } = useEcommerceUi()

        const {
            itemView,
            itemViewOptions,
            totalProducts,
        } = useShopUi()

        const {
            products,
            fetchProducts
        } = useShopRemoteData()

        const {
            mqShallShowLeftSidebar
        } = useResponsiveAppLeftSidebarVisibility()

        // Wrapper Function for `fetchProducts` which can be triggered initially and upon changes of filters
        const fetchShopProducts = () => {
            fetchProducts({
                q: filters.value.q,
                sortBy: sortBy.value.value,
                page: filters.value.page,
                perPage: filters.value.perPage,
            })
            .then(response => {
                products.value = response.data.products
                totalProducts.value = response.data.total
            })
        }

        fetchShopProducts()

        watch([filters, sortBy], () => {
            fetchShopProducts()
        }, {
            deep: true,
        })

        return {
            // useShopFiltersSortingAndPagination
            filters,
            filterOptions,
            sortBy,
            sortByOptions,

            // useShopUi
            itemView,
            itemViewOptions,
            totalProducts,
            toggleProductInWishlist,
            handleCartActionClick,

            // useShopRemoteData
            products,
            fetchProducts,
            fetchShopProducts,

            // mqShallShowLeftSidebar
            mqShallShowLeftSidebar,
            updateExternalLinks
        }
    },
}
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce.scss";
</style><style lang="scss" scoped>
.item-view-radio-group ::v-deep {
    .btn {
        display: flex;
        align-items: center;
    }
}
</style>

<style> 
.sidebar-content .form-group {
    margin: 20px 15px;
}

.sidebar-content button {
    margin-left: 15px;
}
</style>