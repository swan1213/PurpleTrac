<template>
<b-card no-body>
    <b-card-header>
        <h3>
            Settlement Reports
        </h3>
    </b-card-header>

    <b-card-body>
        <div>
            <b-row>
                <b-col cols="6">
                    <b-form-group label="Report">
                        <v-select v-model="selected" @input="onChangeTable(selected)" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="label" :options="option" />
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <!-- sorting  -->
                    <b-form-group label-size="sm" label-align-sm="left" label-for="sortBySelect" class="mb-md-0">
                        <b-form-group label="Date Range">
                            <flat-pickr v-model="rangeDate" @input="onChangeDate(rangeDate)" class="form-control" :config="{ mode: 'range'}" />
                        </b-form-group>
                    </b-form-group>
                </b-col>
            </b-row>
        </div>

        <div class="d-flex justify-content-between  flex-wrap">
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
        <b-table striped hover responsive class="position-relative" :per-page="perPage" :current-page="currentPage" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
            <template #cell(avatar)="data">
                <b-avatar :src="data.value" />
            </template>
        </b-table>
    </div>

    <b-card-body class="d-flex justify-content-between flex-wrap pt-0">

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
    BFormFile
} from 'bootstrap-vue'
import axios from 'axios'
import vSelect from 'vue-select'
import {
    serverUri
} from '@/config'
import flatPickr from 'vue-flatpickr-component'
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
        ToastificationContent,
        vSelect
    },
    data() {
        return {
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
            collection: [],
            items: [],
            selected: {
                title: 'fuel_purchases',
                label: 'Fuel'
            },
            option: [{
                title: 'fuel_purchases',
                label: 'Fuel'
            }, {
                title: 'linehaul_drivers',
                label: 'Drivers'
            }, {
                title: 'linehaul_trips',
                label: 'Trips'
            }, {
                title: 'other_settlement_adjustments',
                label: 'Other Settlements'
            }, {
                title: 'tractor_repairs_misc',
                label: 'Repairs'
            }],
            startDate: null,
            endDate: null,
            sheets: [{
                name: "Sheet1",
                data: [{
                    c: 2
                }]
            }],
        }
    },
    computed: {
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

        axios.post(`${serverUri}/settlement/getdata`, {
            start: this.startDate,
            end: this.endDate,
            table: this.selected
        }).then(res => {
            this.items = res.data.map(item => {
                return {
                    ...item,
                    date: new Date(item.date).toLocaleDateString()
                }
            });
        })
    },
    methods: {
        onChange(event) {
            this.file = event.target.files ? event.target.files[0] : null;
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
        onChangeTable(table) {
            axios.post(`${serverUri}/settlement/getdata`, {
                start: this.startDate,
                end: this.endDate,
                table: table
            }).then(res => {
                this.setField();
                this.items = res.data.map(item => {
                    return {
                        ...item,
                        date: new Date(item.date).toLocaleDateString()
                    }
                });
            })
        },
        onChangeDate(date) {

            if (date.split('to')) {
                this.startDate = date.split('to')[0];
                this.endDate = date.split('to')[1];
            } else {
                this.startDate = date;
            }

            axios.post(`${serverUri}/settlement/getdata`, {
                start: this.startDate,
                end: this.endDate,
                table: this.selected
            }).then(res => {
                this.setField();
                this.items = res.data.map(item => {
                    return {
                        ...item,
                        date: new Date(item.date).toLocaleDateString()
                    }
                });
            })
        },
        setField() {
            if (this.selected.title === 'fuel_purchases') {

                this.fields = [{
                        key: 'year_num',
                        sortable: true,
                        label: 'Year'
                    },
                    {
                        key: 'week_num',
                        sortable: true,
                        label: 'Week'
                    },
                    {
                        key: 'date',
                        sortable: true,
                        label: 'Date'
                    },
                    {
                        key: 'vehicle',
                        sortable: true,
                        label: 'Vehicle'
                    },
                    {
                        key: 'truck_stop',
                        sortable: true,
                        label: 'Truck Stop'
                    },
                    {
                        key: 'city',
                        sortable: true,
                        label: 'City'
                    },
                    {
                        key: 'state',
                        sortable: true,
                        label: 'State'
                    },
                    {
                        key: 'qty',
                        sortable: true,
                        label: 'Quantity'
                    },
                    {
                        key: 'pur_amt',
                        sortable: true,
                        label: 'Amount'
                    }
                ]
            } else if (this.selected.title === 'other_settlement_adjustments') {
                this.fields = [{
                        key: 'year_num',
                        sortable: true,
                        label: 'Year'
                    },
                    {
                        key: 'week_num',
                        sortable: true,
                        label: 'Week'
                    },
                    {
                        key: 'date',
                        sortable: true,
                        label: 'Date'
                    },
                    {
                        key: 'type',
                        sortable: true,
                        label: 'Type'
                    },
                    {
                        key: 'description',
                        sortable: true,
                        label: 'Description'
                    },
                    {
                        key: 'amt',
                        sortable: true,
                        label: 'Amount'
                    },
                ]
            } else if (this.selected.title === 'linehaul_trips') {
                this.fields = [{
                        key: 'date',
                        sortable: true,
                        label: 'Date'
                    },
                    {
                        key: 'trip_id',
                        sortable: true,
                        label: 'Trip ID'
                    },
                    {
                        key: 'vehicle',
                        sortable: true,
                        label: 'Vehicle'
                    },
                    {
                        key: 'leg_org',
                        sortable: true,
                        label: 'ORGN'
                    },
                    {
                        key: 'leg_dest',
                        sortable: true,
                        label: 'DEST'
                    },
                    {
                        key: 'miles_qty',
                        sortable: true,
                        label: 'QTY'
                    },
                    {
                        key: 'vmr_rate',
                        sortable: true,
                        label: 'VMR'
                    },
                    {
                        key: 'mileage_plus',
                        sortable: true,
                        label: 'Mileage Plus'
                    },
                    {
                        key: 'fuel',
                        sortable: true,
                        label: 'Fuel'
                    },
                    {
                        key: 'total_rate',
                        sortable: true,
                        label: 'Total Rate'
                    },
                    {
                        key: 'amt_1',
                        sortable: true,
                        label: '$ AMT'
                    },
                    {
                        key: 'd_and_h',
                        sortable: true,
                        label: 'D&H'
                    },
                    {
                        key: 'flat_rate',
                        sortable: true,
                        label: 'Flat Rate'
                    },
                    {
                        key: 'daily_gross_amt',
                        sortable: true,
                        label: 'Daily Gross $ Amount'
                    },
                    {
                        key: 'driver_1',
                        sortable: true,
                        label: 'Driver 1'
                    },
                    {
                        key: 'driver_2',
                        sortable: true,
                        label: 'Driver 2'
                    },
                ]
            } else if (this.selected.title === 'tractor_repairs_misc') {
                this.fields = [{
                        key: 'year_num',
                        sortable: true,
                        label: 'Year'
                    },
                    {
                        key: 'week_num',
                        sortable: true,
                        label: 'Week'
                    },
                    {
                        key: 'date',
                        sortable: true,
                        label: 'Date'
                    },
                    {
                        key: 'vehicle',
                        sortable: true,
                        label: 'Vehicle'
                    },
                    {
                        key: 'truck_stop',
                        sortable: true,
                        label: 'Truck Stop'
                    },
                    {
                        key: 'city',
                        sortable: true,
                        label: 'City'
                    },
                    {
                        key: 'state',
                        sortable: true,
                        label: 'State'
                    },
                    {
                        key: 'reqair_misc_amt',
                        sortable: true,
                        label: 'Amount'
                    },
                ]
            } else if (this.selected.title === 'linehaul_drivers') {
                this.fields = [{
                        key: 'driver_id',
                        sortable: true,
                        label: 'Driver ID'
                    },
                    {
                        key: 'driver_name',
                        sortable: true,
                        label: 'Name'
                    },
                    {
                        key: 'email',
                        sortable: true,
                        label: 'Email'
                    },
                    {
                        key: 'phone',
                        sortable: true,
                        label: 'Phone'
                    },
                    {
                        key: 'license',
                        sortable: true,
                        label: 'License'
                    },
                    {
                        key: 'address',
                        sortable: true,
                        label: 'Address'
                    },
                    {
                        key: 'price_per_mile',
                        sortable: true,
                        label: 'Price Per Mile'
                    },
                ]
            }
        }
    },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
