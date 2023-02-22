<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height">
      <b-col
        xl="8"
        md="6"
      >
        <ecommerce-statistics :data="data.statisticsItems" />
      </b-col>
      <b-col
        xl="2"
        md="3"
      >
        <ecommerce-fuel-chart :data="data.statisticsFuel" />
      </b-col>
      <b-col
        xl="2"
        md="3"
      >
        <ecommerce-vehicle-chart :data="data.statisticsVehicle" />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="4">
        <b-row class="match-height">
          <!-- Bar Chart - Orders -->
          <b-col
            lg="6"
            md="3"
            cols="6"
          >
            <ecommerce-order-chart :data="data.statisticsPayroll" />
          </b-col>
          <!--/ Bar Chart - Orders -->
          <b-col
            lg="6"
            md="3"
            cols="6"
          >
            <ecommerce-profit-chart :data="data.statisticsMiles" />
          </b-col>
          <b-col
            lg="12"
            md="6"
          >
            <ecommerce-earnings-chart :data="data.earningsChart" />
          </b-col>
        </b-row>
      </b-col>

      <!-- Revenue Report Card -->
      <b-col lg="8">
        <ecommerce-revenue-report :data="data.revenue" />
      </b-col>
      <!--/ Revenue Report Card -->
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import { getUserData } from '@/auth/utils'
import EcommerceMedal from './EcommerceMedal.vue'
import EcommerceStatistics from './EcommerceStatistics.vue'
import EcommerceRevenueReport from './EcommerceRevenueReport.vue'
import EcommerceFuelChart from './EcommerceFuelChart.vue'
import EcommerceOrderChart from './EcommerceOrderChart.vue'
import EcommerceProfitChart from './EcommerceProfitChart.vue'
import EcommerceVehicleChart from './EcommerceVehicleChart.vue'
import EcommerceEarningsChart from './EcommerceEarningsChart.vue'
import EcommerceCompanyTable from './EcommerceCompanyTable.vue'
import EcommerceMeetup from './EcommerceMeetup.vue'
import EcommerceBrowserStates from './EcommerceBrowserStates.vue'
import EcommerceGoalOverview from './EcommerceGoalOverview.vue'
import EcommerceTransactions from './EcommerceTransactions.vue'
import axios from 'axios'
import { serverUri } from '@/config'

export default {
  components: {
    BRow,
    BCol,

    EcommerceMedal,
    EcommerceStatistics,
    EcommerceRevenueReport,
    EcommerceFuelChart,
    EcommerceOrderChart,
    EcommerceProfitChart,
    EcommerceEarningsChart,
    EcommerceCompanyTable,
    EcommerceMeetup,
    EcommerceBrowserStates,
    EcommerceGoalOverview,
    EcommerceTransactions,
    EcommerceVehicleChart,
  },
  data() {
    return {
      data: {
        revenue: {
          years: ['2022', '2019', '2018'],
          price: '25,852',
          budget: '56,800',
          revenueReport: [
            {
              name: 'Earning',
              data: [],
            },
            {
              name: 'Expense',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
          ],
          budgetChart: {
            series: [
              {
                data: [61, 48, 69, 52, 60, 40, 79, 60, 59, 43, 62],
              },
              {
                data: [20, 10, 30, 15, 23, 0, 25, 15, 20, 5, 27],
              },
            ],
          },
        },
        earningsChart: {
          series: [100, 0],
          count: 0
        },
        statisticsFuel: [{ data: [], name: '2020' }],
        statisticsMiles: [{ data: [] }],
        statisticsVehicle: [{ data: [] }],
        statisticsPayroll: [{ data: [] }],
        statisticsItems: [
          {
            icon: 'DollarSignIcon',
            color: 'light-primary',
            title: 0,
            subtitle: 'Revenue',
            customClass: 'mb-2 mb-xl-0',
          },
          {
            icon: 'TrendingUpIcon',
            color: 'light-info',
            title: 0,
            subtitle: 'Miles',
            customClass: 'mb-2 mb-xl-0',
          },
          {
            icon: 'BoxIcon',
            color: 'light-danger',
            title: 0,
            subtitle: 'Fuel',
            customClass: 'mb-2 mb-sm-0',
          },
          {
            icon: 'UserIcon',
            color: 'light-success',
            title: 0,
            subtitle: 'Drivers',
            customClass: '',
          },
        ]
      },
    }
  },
  mounted() {
    // data
    // this.$http.get('/ecommerce/data')
    //   .then(response => {
    //     this.data = response.data

    //     // ? Your API will return name of logged in user or you might just directly get name of logged in user
    //     // ? This is just for demo purpose
    //     const userData = getUserData()
    //     this.data.congratulations.name = userData.fullName.split(' ')[0] || userData.username
    //   })

    // Miles, Fuel, Vehicle Items
    axios.get(`${serverUri}/dashboard/miles`).then(res => {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), 0, 1);
      var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
          
      var year = currentDate.getFullYear();
      var week = Math.ceil(days / 7);

      var fuelArray = [];
      var milesArray = [];
      var revenueArray = [];

      for(let i = 0; i < 6; i++) {
        
        // Miles
        milesArray[i] = res.data.filter(item => item.year_num*59 + item.week_num === year*59 + week - 5 + i)[0]
        milesArray[i] = milesArray[i] ? milesArray[i].totalMiles : 0;

        // Revenue
        revenueArray[i] = res.data.filter(item => item.year_num*59 + item.week_num === year*59 + week - 5 + i)[0]
        revenueArray[i] = revenueArray[i] ? revenueArray[i].totalRevenue.toFixed(2) : 0;
      }
      
      // this.data.satisticsFuel[0].name = year;
      this.data.statisticsMiles[0].data = milesArray;

      // SatisticsItems
      this.data.statisticsItems[0].title = revenueArray[revenueArray.length - 1];
      this.data.statisticsItems[1].title = milesArray[milesArray.length - 1];
      this.data.statisticsItems[2].title = fuelArray[fuelArray.length - 1];

    })

    // Payroll Items
    axios.get(`${serverUri}/dashboard/payroll`).then(res => {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), 0, 1);
      var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
          
      var year = currentDate.getFullYear();
      var week = Math.ceil(days / 7);

      var payrollArray = [];
      var driversArray = [];

      for(let i = 0; i < 10; i++) {
        payrollArray[i] = 0;
        driversArray[i] = 0;

        var driverList = [];

        res.data.payroll.filter(item => item.year_num*59 + item.week_num === year*59 + week - 9 + i).map(item => {
          if (driverList.indexOf(item.driver_1) === -1 && item.driver_1) {
            driverList.push(item.driver_1)
            driversArray[i]++;
          }
          if (driverList.indexOf(item.driver_2) === -1 && item.driver_2) {
            driverList.push(item.driver_2)
            driversArray[i]++;
          }

          let search = res.data.fr.filter(element => element.from_miles <= item.miles_qty && element.to_miles >= item.miles_qty);
          let price = Math.ceil(item.miles_qty*item.price_per_mile);

          payrollArray[i] += search.length ? Math.ceil(search[0].fixed_rate) : ( price ? Math.ceil(price) : 0 );
        })
      }


      // Driver Items
      this.data.statisticsItems[3].title = driversArray[driversArray.length - 1]

      // Payroll Items
      this.data.statisticsPayroll[0].data = payrollArray.slice(4, payrollArray.length);

      this.data.revenue.revenueReport[0].data = payrollArray;
    })

    // Fuel Purchase vs Receipts
    axios.get(`${serverUri}/dashboard/receipt`).then(res => {

      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), 0, 1);
      var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
          
      var year = currentDate.getFullYear();
      var week = Math.ceil(days / 7);

      var fuelArray = [];
      var vehicleArray = [];

      for(let i = 0; i < 6; i++) {
        // Fuel
        fuelArray[i] = res.data.fuel_purchase.filter(item => item.year_num*59 + item.week_num === year*59 + week - 5 + i)[0]
        fuelArray[i] = fuelArray[i] ? fuelArray[i].totalFuel : 0;
        
        // Vehicle
        vehicleArray[i] = (parseInt(this.data.statisticsMiles[0].data[i])/fuelArray[i]) ? (parseInt(this.data.statisticsMiles[0].data[i])/fuelArray[i]).toFixed(3) : 0;
      }
      
      this.data.statisticsFuel[0].data = fuelArray;
      this.data.statisticsVehicle[0].data = vehicleArray;

      // SatisticsItems
      this.data.statisticsItems[2].title = fuelArray[fuelArray.length - 1];

      // this.data.earningsChart.series.push(fuelArray[fuelArray.length - 1] ? fuelArray[fuelArray.length - 1]/(fuelArray[fuelArray.length - 1]+res.data.receipt[0].totalReceipt)*100 : 0);
      // this.data.earningsChart.series.push(res.data.receipt[0].totalReceipt ? res.data.receipt[0].totalReceipt/(fuelArray[fuelArray.length - 1]+res.data.receipt[0].totalReceipt)*100 : 0);
      this.data.earningsChart.count = res.data.receipt[0].totalNum ? res.data.count / res.data.receipt[0].totalNum * 100 : 0 ;
    })

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
