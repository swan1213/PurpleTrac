<template>
<b-card no-body>
   <b-overlay :show="show" variant="light" opacity="0.5" rounded="sm">
      <xlsx-read :file="file">
         <xlsx-json :sheet="selectedSheet">
            <template #default="{collection}">
               <b-card-header>
                  <h3>
                     Upload Settlement
                  </h3>
               </b-card-header>

               <b-card-body>
                  <div class="mb-1">
                     <b-row>
                        <b-col class="mb-1" lg="4" md="6" sm="12">
                           <b-form-file v-model="file" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..." />
                        </b-col>
                        <b-col class="mb-1" lg="5" md="6" sm="12">
                           <v-select v-model="selectedTable" @input="onChangeTable(selectedTable)" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="tables" />
                        </b-col>
                        <b-col lg="3" md="6">
                           <b-button variant="primary" @click="onImportData">
                              <feather-icon icon="UploadIcon" class="mr-50" />Import Data</b-button>
                        </b-col>
                     </b-row>
                  </div>

                  <div v-if="collection" class="d-flex flex-wrap">
                     <v-select style="width: 15%;" v-model="selectedYear" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="years" />
                     <v-select class="ml-2" style="width: 15%;" v-model="selectedWeek" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="weeks" />
                     <!-- sorting  -->
                     <div style="flex-grow: 1" />

                     <!-- filter -->
                     <b-form-group label="Filter" label-cols-sm="2" label-align-sm="left" label-size="md" label-for="filterInput" class="mb-0">
                        <b-input-group size="md">
                           <b-form-input id="filterInput" v-model="filter" type="search" placeholder="Type to Search" />
                           <b-input-group-append>
                              <b-button :disabled="!filter" @click="filter = ''">
                                 Clear
                              </b-button>
                           </b-input-group-append>
                        </b-input-group>
                     </b-form-group>
                  </div>
               </b-card-body>
               <div>
                  <b-table striped hover responsive class="position-relative" :per-page="perPage" :current-page="currentPage" :items="collection ? (onCreateData(collection), items) : []" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                     <template #cell(avatar)="data">
                        <b-avatar :src="data.value" />
                     </template>
                  </b-table>
               </div>

               <b-card-body v-if="collection" class="d-flex justify-content-between flex-wrap pt-0">

                  <!-- page length -->
                  <b-form-group label="Per Page" label-cols="6" label-align="left" label-size="sm" label-for="sortBySelect" class="text-nowrap mb-md-0 mr-1">
                     <b-form-select id="perPageSelect" v-model="perPage" size="sm" inline :options="pageOptions" />
                  </b-form-group>

                  <!-- pagination -->
                  <div>
                     <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" first-number last-number prev-class="prev-item" next-class="next-item" class="mb-0">
                        <template #prev-text>
                           <feather-icon icon="ChevronLeftIcon" size="18" />
                        </template>
                        <template #next-text>
                           <feather-icon icon="ChevronRightIcon" size="18" />
                        </template>
                     </b-pagination>
                  </div>
               </b-card-body>
            </template>

         </xlsx-json>
      </xlsx-read>
   </b-overlay>
</b-card>
</template>

<script>
import {
   XlsxRead,
   XlsxTable,
   XlsxSheets,
   XlsxJson,
   XlsxWorkbook,
   XlsxSheet,
   XlsxDownload
} from "vue-xlsx/dist/vue-xlsx.es.js"
import {
   BCard,
   BRow,
   BCol,
   BCardHeader,
   BTable,
   BAvatar,
   BBadge,
   BFormGroup,
   BFormSelect,
   BPagination,
   BInputGroup,
   BFormInput,
   BInputGroupAppend,
   BButton,
   BCardBody,
   BFormFile,
   BOverlay,
} from 'bootstrap-vue'
import axios from 'axios'
import vSelect from 'vue-select'
import {
   serverUri
} from '@/config'
import {
   mapState,
   mapActions
} from 'vuex'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
   components: {
      XlsxRead,
      XlsxTable,
      XlsxSheets,
      XlsxJson,
      XlsxWorkbook,
      XlsxSheet,
      XlsxDownload,
      BRow,
      BCol,
      BCard,
      BFormFile,
      BCardHeader,
      BTable,
      BAvatar,
      BBadge,
      BFormGroup,
      BFormSelect,
      BPagination,
      BInputGroup,
      BFormInput,
      BInputGroupAppend,
      BButton,
      BCardBody,
      flatPickr,
      BOverlay,
      ToastificationContent,
      vSelect
   },
   data() {
      return {
         show: false,
         rangeDate: null,
         perPage: 25,
         pageOptions: [5, 10, 15, 25],
         totalRows: 1,
         currentPage: 1,
         sortBy: '',
         sortDesc: false,
         sortDirection: 'asc',
         filter: ' ',
         filterOn: [],
         infoModal: {
            id: 'info-modal',
            title: '',
            content: '',
         },
         fields: [],
         /* eslint-disable global-require */
         selected: {
            title: 'fuel_purchases'
         },
         option: [{
            title: 'fuel_purchases'
         }, {
            title: 'linehaul_drivers'
         }, {
            title: 'linehaul_trips'
         }, {
            title: 'other_settlement_adjustments'
         }, {
            title: 'tractor_repairs_misc'
         }],
         file: null,
         selectedSheet: 'Sheet1',
         sheetName: null,
         sheets: [{
            name: "Sheet1",
            data: [{
               c: 2
            }]
         }],
         collection: [],
         years: [],
         weeks: [],
         selectedYear: null,
         selectedWeek: null,
         selectedTable: null,
         tables: [{
            title: 'fuel_purchases'
         }, {
            title: 'linehaul_drivers'
         }, {
            title: 'linehaul_trips'
         }, {
            title: 'other_settlement_adjustments'
         }, {
            title: 'tractor_repairs_misc'
         }],
         totalData: [],
      }
   },
   computed: {
      ...mapState({
         items: state => state.settlementStore.uploadlist
      }),
      sortOptions() {
         // Create an options list from our fields
         return this.fields
            .filter(f => f.sortable)
            .map(f => ({
               text: f.label,
               value: f.key
            }))
      },
   },
   mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length

      const date = new Date();
      const currentYear = date.getFullYear();

      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), 0, 1);
      var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
      var weekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7);

      for (let i = currentYear - 3; i <= currentYear; i++) {
         this.years.push(i);
      }

      for (let i = 1; i <= 54; i++) {
         this.weeks.push(i);
      }

      this.selectedYear = currentYear;
      this.selectedWeek = weekNumber - 1;
   },
   methods: {
      ...mapActions('settlementStore', ['addDataAction']),
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
      onChange(event) {
         this.file = event.target.files ? event.target.files[0] : null;
      },
      addSheet() {
         this.sheets.push({
            name: this.sheetName,
            data: [...this.collection]
         });
         this.sheetName = null;
      },
      info(item, index, button) {
         this.infoModal.title = `Row index: ${index}`
         this.infoModal.content = JSON.stringify(item, null, 2)
         this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
         this.infoModal.title = ''
         this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
         // Trigger pagination to update the number of buttons/pages due to filtering
         this.totalRows = filteredItems.length
         this.currentPage = 1
      },
      onImportData() {
         if (this.totalData.length) {
            this.show = true;

            this.$swal({
               title: 'Are you sure?',
               text: "You won't be able to revert this!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: 'Yes, Upload it!',
               customClass: {
                  confirmButton: 'btn btn-primary',
                  cancelButton: 'btn btn-outline-danger ml-1',
               },
               buttonsStyling: false,
            }).then(result => {
               if (result.value) {
                  axios.post(`${serverUri}/settlement/uploaddata`, {
                     table: this.totalData,
                     year: this.selectedYear,
                     week: this.selectedWeek
                  }).then(res => {
                     if (res.data.msg) {
                        this.show = false;

                        this.showToast('success', 'Success', 'The datas have been uploaded.');
                        this.$swal({
                           icon: 'success',
                           title: 'Uploaded!',
                           text: 'Your file has been uploaded.',
                           customClass: {
                              confirmButton: 'btn btn-success',
                           },
                        })
                     }
                  });

               }
            })
         } else {
            this.showToast('danger', 'Failure', 'The data that you are gonna upload is not exist.');
         }

      },
      onChangeTable(table) {

         this.addDataAction(this.totalData.filter(item => item.table === table.title)[0].data)
      },
      onCreateData(data) {

         var list = [{
               table: 'linehaul_trips',
               data: []
            },
            {
               table: 'linehaul_drivers',
               data: []
            },
            {
               table: 'fuel_purchases',
               data: []
            },
            {
               table: 'other_settlement_adjustments',
               data: []
            },
            {
               table: 'tractor_repairs_misc',
               data: []
            },
            {
               table: 'receipts',
               data: []
            }
         ];

         var field = null;
         var header = null;
         var vehicle = null;

         for (let i = 0; i < data.length; i++) {

            switch (data[i]['Col 1']) {
               case 'VEHICLE':
                  vehicle = data[i]['Col 2'];

                  continue;
               case 'LINEHAUL TRIPS':
                  header = 'linehaul_trips';

                  continue;
               case 'FUEL PURCHASES':
                  header = 'fuel_purchases';

                  continue;
               case 'TRACTOR REPAIRS/MISC':
                  header = 'tractor_repairs_misc';

                  continue;
               case 'OTHER SETTLEMENT ADJUSTMENTS':
                  header = 'other_settlement_adjustments';

                  continue;
               case 'Linehaul Drivers':
                  header = 'linehaul_drivers';

                  continue;
               case '** FUEL RECEIPTS USED FOR VARIABLE':
                  header = 'receipts';

                  continue;
               case 'DATE':

                  continue;
            }

            var utc_days = Math.floor(data[i]['Col 1'] - 25569);
            var utc_value = utc_days * 86400;
            var date_info = new Date(utc_value * 1000);

            if (header === 'linehaul_trips' && Object.keys(data[i]).length === 19) {
               field = {
                  date: date_info.toLocaleDateString(),
                  vehicle: vehicle,
                  trip_id: data[i]['Col 2'],
                  leg_org: data[i]['Col 3'],
                  leg_dest: data[i]['Col 4'],
                  miles_qty: data[i]['Col 6'],
                  vmr_rate: data[i]['Col 7'],
                  mileage_plus: data[i]['Col 8'],
                  premiums: data[i]['Col 9'],
                  fuel: data[i]['Col 10'],
                  total_rate: data[i]['Col 11'],
                  amt_1: data[i]['Col 12'],
                  pkgs: data[i]['Col 13'],
                  amt_2: data[i]['Col 14'],
                  d_and_h: data[i]['Col 15'],
                  tolls: data[i]['Col 16'],
                  flat_rate: data[i]['Col 17'],
                  daily_gross_amt: data[i]['Col 18'],
                  driver_1: data[i]['Col 19'],
                  driver_2: data[i]['Col 20'],
               };

               list[0].data.push(field);
            } else if (header === 'fuel_purchases' && Object.keys(data[i]).length === 9) {
               field = {
                  date: date_info.toLocaleDateString(),
                  ticket_check_id: data[i]['Col 2'],
                  vehicle: data[i]['Col 3'],
                  truck_stop: data[i]['Col 4'],
                  city: data[i]['Col 5'],
                  state: data[i]['Col 6'],
                  qty: data[i]['Col 7'],
                  pur_amt: data[i]['Col 8'],
               }

               list[2].data.push(field);
            } else if (header === 'linehaul_drivers' && Object.keys(data[i]).length === 2 && data[i]['Col 1'] !== 'Driver ID') {
               field = {
                  driver_id: data[i]['Col 1'],
                  driver_name: data[i]['Col 2'],
               }

               list[1].data.push(field);
            } else if (header === 'tractor_repairs_misc' && Object.keys(data[i]).length === 7) {
               field = {
                  date: date_info.toLocaleDateString(),
                  ticket_check_id: data[i]['Col 2'],
                  vehicle: data[i]['Col 3'],
                  truck_stop: data[i]['Col 4'],
                  city: data[i]['Col 5'],
                  state: data[i]['Col 6'],
               }

               list[4].data.push(field);
            } else if (header === 'other_settlement_adjustments' && Object.keys(data[i]).length === 4) {
               field = {
                  date: date_info.toLocaleDateString(),
                  type: data[i]['Col 2'],
                  description: data[i]['Col 3'],
                  amt: data[i]['Col 14'],
               }

               list[3].data.push(field);
            } else if (header === 'receipts' && Object.keys(data[i]).length >= 8) {
               field = {
                  date: date_info.toLocaleDateString(),
                  ticket_check: data[i]['Col 2'],
                  vehicle: data[i]['Col 3'],
                  truck_stop: data[i]['Col 4'],
                  city: data[i]['Col 5'],
                  state: data[i]['Col 6'],
                  zip: data[i]['Col 7'],
                  qty: data[i]['Col 8'],
                  fuel_supp_amt: data[i]['Col 10'],
               }

               list[5].data.push(field);
            }
         }

         this.totalData = list;
      },
   },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
