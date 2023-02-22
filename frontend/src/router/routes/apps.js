export default [
  {
    path: '/apps/calendar',
    name: 'apps-calendar',
    component: () => import('@/views/apps/calendar/Calendar.vue'),
  },

  // *===============================================---*
  // *--------- TODO & IT'S FILTERS N TAGS ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/todo',
    name: 'apps-todo',
    component: () => import('@/views/apps/todo/Todo.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
    },
  },
  {
    path: '/apps/todo/:filter',
    name: 'apps-todo-filter',
    component: () => import('@/views/apps/todo/Todo.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
      navActiveLink: 'apps-todo',
    },
    beforeEnter(to, _, next) {
      if (['pending', 'in progress', 'completed', 'cancelled'].includes(to.params.filter)) next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/apps/todo/tag/:tag',
    name: 'apps-todo-tag',
    component: () => import('@/views/apps/todo/Todo.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'todo-application',
      navActiveLink: 'apps-todo',
    },
    beforeEnter(to, _, next) {
      if (['team', 'low', 'medium', 'high', 'update'].includes(to.params.tag)) next()
      else next({ name: 'error-404' })
    },
  },

  // *===============================================---*
  // *--------- CHAT  ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/chat',
    name: 'apps-chat',
    component: () => import('@/views/apps/chat/Chat.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'chat-application',
    },
  },

  // *===============================================---*
  // *--------- ECOMMERCE  ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/e-commerce/shop',
    name: 'apps-e-commerce-shop',
    component: () => import('@/views/apps/e-commerce/e-commerce-shop/ECommerceShop.vue'),
    meta: {
      contentRenderer: 'sidebar-left-detached',
      contentClass: 'ecommerce-application',
      pageTitle: 'Shop',
      breadcrumb: [
        {
          text: 'ECommerce',
        },
        {
          text: 'Shop',
          active: true,
        },
      ],
    },
  },
  {
    path: '/apps/e-commerce/wishlist',
    name: 'apps-e-commerce-wishlist',
    component: () => import('@/views/apps/e-commerce/e-commerce-wishlist/ECommerceWishlist.vue'),
    meta: {
      pageTitle: 'Wishlist',
      contentClass: 'ecommerce-application',
      breadcrumb: [
        {
          text: 'ECommerce',
        },
        {
          text: 'Wishlist',
          active: true,
        },
      ],
    },
  },
  {
    path: '/apps/e-commerce/checkout',
    name: 'apps-e-commerce-checkout',
    component: () => import('@/views/apps/e-commerce/e-commerce-checkout/ECommerceCheckout.vue'),
    meta: {
      pageTitle: 'Checkout',
      contentClass: 'ecommerce-application',
      breadcrumb: [
        {
          text: 'ECommerce',
        },
        {
          text: 'Checkout',
          active: true,
        },
      ],
    },
  },
  {
    path: '/apps/e-commerce/:slug',
    name: 'apps-e-commerce-product-details',
    component: () => import('@/views/apps/e-commerce/e-commerce-product-details/ECommerceProductDetails.vue'),
    meta: {
      pageTitle: 'Product Details',
      contentClass: 'ecommerce-application',
      breadcrumb: [
        {
          text: 'ECommerce',
        },
        {
          text: 'Shop',
          active: true,
        },
        {
          text: 'Product Details',
          active: true,
        },
      ],
    },
  },

  // *===============================================---*
  // *--------- USER ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/users/list',
    name: 'apps-users-list',
    component: () => import('@/views/apps/user/users-list/UsersList.vue'),
    meta: {
      action: 'read',
      resource: 'manage-user',
    }
  },
  {
    path: '/apps/users/edit/:id',
    name: 'apps-users-edit',
    component: () => import('@/views/apps/user/users-edit/UsersEdit.vue'),
  },

  // *===============================================---*
  // *--------- COMPANY ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/company/overview',
    name: 'apps-company-overview',
    component: () => import('@/views/apps/company/overview'),
    meta: {
      pageTitle: 'Company',
      breadcrumb: [
        {
          text: 'Company Overview',
        },
      ],
    }
  },
  {
    path: '/apps/company/connections',
    name: 'apps-company-connections',
    component: () => import('@/views/apps/company/connections'),
    meta: {
      pageTitle: 'Company',
      breadcrumb: [
        {
          text: 'Company Connections',
        },
      ],
    }
  },
  {
    path: '/apps/company/billing',
    name: 'apps-company-billing',
    component: () => import('@/views/apps/company/billing'),
    meta: {
      pageTitle: 'Company',
      breadcrumb: [
        {
          text: 'Company Billing',
        },
      ],
    }
  },
  {
    path: '/apps/company/billing/choose',
    name: 'apps-company-billing-choose',
    component: () => import('@/views/apps/company/billing/ChoosePlan.vue'),
    meta: {
      pageTitle: 'Company',
      breadcrumb: [
        {
          text: 'Company Plan',
        },
      ],
    }
  },
  {
    path: '/apps/company/domiciles',
    name: 'apps-company-domiciles',
    component: () => import('@/views/apps/company/domiciles'),
    meta: {
      pageTitle: 'Company',
      breadcrumb: [
        {
          text: 'Company Domiciles',
        },
      ],
    }
  },

  // *===============================================---*
  // *--------- WEEKLY SCHEDULE ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/schedule/view',
    name: 'apps-schedule-build',
    component: () => import('@/views/apps/schedule'),
    meta: {
      pageTitle: 'Schedule',
      breadcrumb: [
        {
          text: 'View Schedule',
        },
      ],
    }
  },

  // *===============================================---*
  // *--------- PAYROLL ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/payroll/setting',
    name: 'apps-payroll-setting',
    component: () => import('@/views/apps/payroll/setting'),
    meta: {
      pageTitle: 'Payroll',
      breadcrumb: [
        {
          text: 'Payroll'
        },
        {
          text: 'Setting',
          active: true
        },
      ],
    }
  },
  {
    path: '/apps/payroll/edit/:id',
    name: 'apps-payroll-edit',
    component: () => import('@/views/apps/payroll/setting/Form.vue'),
    meta: {
      pageTitle: 'Payroll',
      breadcrumb: [
        {text: 'Payroll'},
        {text: 'Setting', active: true},
        {text: 'Fixed Rate', active: true}
      ],
    }
  },
  {
    path: '/apps/payroll/earning',
    name: 'apps-payroll-earning',
    component: () => import('@/views/apps/payroll/driver_earning'),
    meta: {
      pageTitle: 'Payroll',
      breadcrumb: [
        {
          text: 'Driver Earning',
        },
      ],
    }
  },
  {
    path: '/apps/payroll/report/:id',
    name: 'apps-payroll-report',
    component: () => import('@/views/apps/payroll/driver_earning/Form.vue'),
    meta: {
      pageTitle: 'Payroll',
      breadcrumb: [
        { text: 'Driver Earning' },
        { text: 'View Report', active: true }
      ],
    }
  },
  {
    path: '/apps/payroll/company',
    name: 'apps-payroll-company',
    component: () => import('@/views/apps/payroll/company_payroll'),
    meta: {
      pageTitle: 'Payroll',
      breadcrumb: [
        {
          text: 'Company Payroll',
        },
      ],
    }
  },
  {
    path: '/apps/payroll/driver',
    name: 'apps-payroll-driver',
    component: () => import('@/views/apps/payroll/company_payroll/Form.vue'),
    meta: {
      pageTitle: 'Payroll',
      breadcrumb: [
        {
          text: 'Company Payroll',
        },
      ],
    }
  },

  // *===============================================---*
  // *--------- FLEET ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/fleet/list',
    name: 'apps-fleet-list',
    component: () => import('@/views/apps/fleet/tractor_list'),
    meta: {
      pageTitle: 'Fleet',
      breadcrumb: [
        {
          text: 'Tractor List',
        },
      ],
    }
  },
  {
    path: '/apps/fleet/maintenance',
    name: 'apps-fleet-maintenance',
    component: () => import('@/views/apps/fleet/maintenance'),
    meta: {
      pageTitle: 'Fleet',
      breadcrumb: [
        {
          text: 'Fleet Maintenance',
        },
      ],
    }
  },
  {
    path: '/apps/fleet/mmr',
    name: 'apps-fleet-mmr',
    component: () => import('@/views/apps/fleet/mmr'),
    meta: {
      pageTitle: 'Fleet',
      breadcrumb: [
        {
          text: 'Fleet MMR',
        },
      ],
    }
  },
  {
    path: '/apps/fleet/map',
    name: 'apps-fleet-map',
    component: () => import('@/views/apps/fleet/map'),
    meta: {
      pageTitle: 'Fleet',
      breadcrumb: [
        {
          text: 'Locate Fleet',
        },
      ],
    }
  },

  // *===============================================---*
  // *--------- SETTLEMENTS ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/settlements/uploading',
    name: 'apps-settlement-uploading',
    component: () => import('@/views/apps/settlements/UploadingPage.vue'),
    meta: {
      pageTitle: 'Settlements',
      breadcrumb: [
        {
          text: 'Upload',
        },
      ],
    }
  },
  {
    path: '/apps/settlements',
    name: 'apps-settlement-connection',
    component: () => import('@/views/apps/settlements/ConnectionPage.vue'),
    meta: {
      pageTitle: 'Settlements',
      breadcrumb: [
        {
          text: 'Reports',
        },
      ],
    }
  },

  // *===============================================---*
  // *--------- DRIVERS ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/drivers',
    name: 'apps-drivers',
    component: () => import('@/views/apps/drivers'),
    meta: {
      pageTitle: 'Drivers',
      breadcrumb: [
        {
          text: 'Drivers List',
        },
      ],
    }
  },

  // *===============================================---*
  // *--------- Utilities ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/utilities',
    name: 'apps-utilities',
    component: () => import('@/views/apps/utilities/e-commerce-shop/ECommerceShop.vue'),
    meta: {
      contentRenderer: 'sidebar-left-detached',
      contentClass: 'ecommerce-application',
      pageTitle: 'Utilities',
      breadcrumb: [
        {
          text: 'Favorite Websites',
        },
      ],
    },
  },

  // *===============================================---*
  // *--------- Utilities ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/fleet/tractorlist',
    name: 'apps-fleet-list',
    component: () => import('@/views/apps/fleet/tractor_list'),
    meta: {
      pageTitle: 'Fleet',
      breadcrumb: [
        {
          text: 'Tractor List',
        },
      ],
    },
  },
  {
    path: '/apps/fleet/maintenance',
    name: 'apps-fleet-maintenance',
    component: () => import('@/views/apps/fleet/maintenance'),
    meta: {
      pageTitle: 'Fleet',
      breadcrumb: [
        {
          text: 'Maintenance',
        },
      ],
    },
  },
  {
    path: '/apps/fleet/mmr',
    name: 'apps-fleet-mmr',
    component: () => import('@/views/apps/fleet/mmr'),
    meta: {
      pageTitle: 'Fleet',
      breadcrumb: [
        {
          text: 'MMR',
        },
      ],
    },
  },
  {
    path: '/apps/fleet/map',
    name: 'apps-fleet-map',
    component: () => import('@/views/apps/fleet/map'),
    meta: {
      pageTitle: 'Fleet',
      breadcrumb: [
        {
          text: 'Map',
        },
      ],
    },
  },

  // *===============================================---*
  // *--------- KPIs ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/kpi/revenue',
    name: 'kpis-revenue-week',
    component: () => import('@/views/apps/kpi/revenue/index.vue'),
    meta: {
      pageTitle: 'KPIs',
      breadcrumb: [
        {
          text: 'Revenue Per Week',
        },
      ],
    },
  },
  {
    path: '/apps/kpi/miles/total',
    name: 'kpis-miles-total',
    component: () => import('@/views/apps/kpi/miles/Total.vue'),
    meta: {
      pageTitle: 'KPIs',
      breadcrumb: [
        {
          text: 'Total Miles Per Week',
        },
      ],
    },
  },
  {
    path: '/apps/kpi/miles/driver',
    name: 'kpis-miles-driver',
    component: () => import('@/views/apps/kpi/miles/Driver.vue'),
    meta: {
      pageTitle: 'KPIs',
      breadcrumb: [
        {
          text: 'Miles Per Week By Driver',
        },
      ],
    },
  },
  {
    path: '/apps/kpi/miles/vehicle',
    name: 'kpis-miles-vehicle',
    component: () => import('@/views/apps/kpi/miles/Vehicle.vue'),
    meta: {
      pageTitle: 'KPIs',
      breadcrumb: [
        {
          text: 'Miles Per Week By Vehicle',
        },
      ],
    },
  },
  {
    path: '/apps/kpi/mpg/vehicle',
    name: 'kpis-mpg-week',
    component: () => import('@/views/apps/kpi/mpg/index.vue'),
    meta: {
      pageTitle: 'KPIs',
      breadcrumb: [
        {
          text: 'MPG Per Week By Vehicle',
        },
      ],
    },
  },
  {
    path: '/apps/kpi/fuelcost/total',
    name: 'kpis-fuel-total',
    component: () => import('@/views/apps/kpi/fuelcost/Total.vue'),
    meta: {
      pageTitle: 'KPIs',
      breadcrumb: [
        {
          text: 'Total Fuel Cost Per Week',
        },
      ],
    },
  },
  {
    path: '/apps/kpi/fuelcost/vehicle',
    name: 'kpis-fuel-vehicle',
    component: () => import('@/views/apps/kpi/fuelcost/Vehicle.vue'),
    meta: {
      pageTitle: 'KPIs',
      breadcrumb: [
        {
          text: 'Fuel Cost Per Week By Vehicle',
        },
      ],
    },
  },
]