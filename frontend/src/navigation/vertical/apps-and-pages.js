export default [
  {
    title: 'Company',
    icon: 'HomeIcon',
    children: [
      {
        title: 'Overview',
        route: 'apps-company-overview',
        resource: 'manage-company',
        action: 'read',
      },
      {
        title: 'Connections',
        route: 'apps-company-connections',
        resource: 'manage-company',
        action: 'read',
      },
      {
        title: 'Billing',
        route: 'apps-company-billing',
        resource: 'manage-company',
        action: 'read',
      },
      {
        title: 'Domiciles',
        route: 'apps-company-domiciles',
        resource: 'manage-company',
        action: 'read',
      }
    ]
  },
  {
    title: 'Users',
    icon: 'UserIcon',
    route: 'apps-users-list',
    resource: 'manage-user',
    action: 'read',
  },
  {
    title: 'Tasks',
    route: 'apps-todo',
    icon: 'CheckSquareIcon',
    resource: 'manage-task',
    action: 'read',
  },
  {
    title: 'Settlements',
    icon: 'DollarSignIcon',
    children: [
      {
        title: 'Upload',
        route: 'apps-settlement-uploading',
        resource: 'manage-gf-statement',
        action: 'read',
      },
      {
        title: 'Reports',
        route: 'apps-settlement-connection',
        resource: 'manage-gf-statement',
        action: 'read',
      },
    ]
  },
  {
    title: 'Fleet',
    icon: 'TruckIcon',
    children: [
      {
        title: 'Tractor List',
        route: 'apps-fleet-list',
        resource: 'manage-fleet',
        action: 'read',
      },
      {
        title: 'Maintenance',
        route: 'apps-fleet-maintenance',
        resource: 'manage-fleet',
        action: 'read',
      },
      {
        title: 'MMR', 
        route: 'apps-fleet-mmr',
        resource: 'manage-fleet',
        action: 'read',
      },
      {
        title: 'Map', 
        route: 'apps-fleet-map',
        resource: 'manage-fleet',
        action: 'read',
      }
    ]
  },
  {
    title: 'Drivers',
    route: 'apps-drivers',
    icon: 'UserIcon',
    resource: 'manage-driver',
    action: 'read',
  },
  {
    title: 'Weekly Schedule',
    route: 'apps-schedule-build',
    icon: 'CalendarIcon',
    resource: 'manage-schedule',
    action: 'read',
  },
  {
    title: 'Payroll',
    route: 'apps-payroll',
    icon: 'CreditCardIcon',
    children: [
      {
        title: 'Setting',
        route: 'apps-payroll-setting',
        resource: 'manage-payroll-setting',
        action: 'read',
      },
      {
        title: 'Driver Earning',
        route: 'apps-payroll-earning',
        resource: 'manage-payroll',
        action: 'read',
      },
      {
        title: 'Company Payroll',
        route: 'apps-payroll-company',
        resource: 'manage-payroll',
        action: 'read',
      }
    ]
  },
  {
    title: 'Utilities',
    icon: 'CommandIcon',
    route: 'apps-utilities',
    resource: 'manage-utilities',
    action: 'read',
  },
  {
    title: 'KPIs',
    icon: 'ClockIcon',
    children: [
      {
        title: 'Revenue',
        icon: 'DollarSignIcon',
        resource: 'manage-kpi',
        action: 'read',
        children: [
          {
            title: 'Revenue Per Week', 
            route: 'kpis-revenue-week',
            resource: 'manage-kpi',
            action: 'read',
          }
        ]
      },
      {
        title: 'Miles',
        icon: 'RepeatIcon',
        children: [
          {
            title: 'Miles Per Week By Total', 
            route: 'kpis-miles-total',
            resource: 'manage-kpi',
            action: 'read',
          },
          {
            title: 'Miles Per Week By Driver', 
            route: 'kpis-miles-driver',
            resource: 'manage-kpi',
            action: 'read',
          },
          {
            title: 'Miles Per Week By Vehicle', 
            route: 'kpis-miles-vehicle',
            resource: 'manage-kpi',
            action: 'read',
          }
        ]
      },
      {
        title: 'MPG',
        icon: 'ActivityIcon',
        children: [
          {
            title: 'MPG Per Week By Vehicle', 
            route: 'kpis-mpg-week',
            resource: 'manage-kpi',
            action: 'read',
          }
        ]
      },
      {
        title: 'Fuel Cost',
        icon: 'RefreshCcwIcon',
        children: [
          {
            title: 'Cost Per Week By Total', 
            route: 'kpis-fuel-total',
            resource: 'manage-kpi',
            action: 'read',
          },
          {
            title: 'Cost Per Week By Vehicle', 
            route: 'kpis-fuel-vehicle',
            resource: 'manage-kpi',
            action: 'read',
          }
        ]
      }
    ]
  }
]
