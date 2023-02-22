<template>
<b-card no-body>
    <b-card-body>
        <div class="d-flex justify-content-between  flex-wrap">

            <!-- sorting  -->
            <b-button-group label-align-sm="left" label-cols-sm="2" label-for="sortBySelect" class="mr-1 mb-md-0">
                <b-button v-b-modal.modal-tall v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary">
                    Add
                </b-button>
                <b-button @click="onRemove" v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary">
                    Remove
                </b-button>
                <b-button @click="sendSMS" v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary">
                    Send SMS
                </b-button>
            </b-button-group>
            <!-- <b-form-group label-size="sm"  /> -->

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

    <b-table striped hover responsive class="position-relative" :per-page="perPage" :current-page="currentPage" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
        <template #cell(id)="data">
            <b-form-checkbox :value="data.item.id" class="custom-control-primary" @change="onCheckDriver(data.item.id)" />
        </template>
        <template #cell(driver)="data">
            <div>
                {{ data.item.driver.split('+')[0] }}
            </div>
            <div>
                {{ data.item.driver.split('+')[1] }}
            </div>
        </template>
        <template #cell(saturday)="data">
            <b-badge v-if="data.item.saturday === 'OFF'" variant="light-danger">
                {{ data.item.saturday }}
            </b-badge>
            <div v-else>
                <div>
                    {{ data.item.saturday.split('-')[0] }}
                </div>
                <div>
                    {{ data.item.saturday.split('-')[1] }}
                </div>
            </div>
        </template>
        <template #cell(sunday)="data">
            <b-badge v-if="data.item.sunday === 'OFF'" variant="light-danger">
                {{ data.item.sunday }}
            </b-badge>
            <div v-else>
                <div>
                    {{ data.item.sunday.split('-')[0] }}
                </div>
                <div>
                    {{ data.item.sunday.split('-')[1] }}
                </div>
            </div>
        </template>
        <template #cell(monday)="data">
            <b-badge v-if="data.item.monday === 'OFF'" variant="light-danger">
                {{ data.item.monday }}
            </b-badge>
            <div v-else>
                <div>
                    {{ data.item.monday.split('-')[0] }}
                </div>
                <div>
                    {{ data.item.monday.split('-')[1] }}
                </div>
            </div>
        </template>
        <template #cell(tuesday)="data">
            <b-badge v-if="data.item.tuesday === 'OFF'" variant="light-danger">
                {{ data.item.tuesday }}
            </b-badge>
            <div v-else>
                <div>
                    {{ data.item.tuesday.split('-')[0] }}
                </div>
                <div>
                    {{ data.item.tuesday.split('-')[1] }}
                </div>
            </div>
        </template>
        <template #cell(wednesday)="data">
            <b-badge v-if="data.item.wednesday === 'OFF'" variant="light-danger">
                {{ data.item.wednesday }}
            </b-badge>
            <div v-else>
                <div>
                    {{ data.item.wednesday.split('-')[0] }}
                </div>
                <div>
                    {{ data.item.wednesday.split('-')[1] }}
                </div>
            </div>
        </template>
        <template #cell(thursday)="data">
            <b-badge v-if="data.item.thursday === 'OFF'" variant="light-danger">
                {{ data.item.thursday }}
            </b-badge>
            <div v-else>
                <div>
                    {{ data.item.thursday.split('-')[0] }}
                </div>
                <div>
                    {{ data.item.thursday.split('-')[1] }}
                </div>
            </div>
        </template>
        <template #cell(friday)="data">
            <b-badge v-if="data.item.friday === 'OFF'" variant="light-danger">
                {{ data.item.friday }}
            </b-badge>
            <div v-else>
                <div>
                    {{ data.item.friday.split('-')[0] }}
                </div>
                <div>
                    {{ data.item.friday.split('-')[1] }}
                </div>
            </div>
        </template>
    </b-table>

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

    <!-- select 2 demo -->
    <b-modal size="lg" id="modal-tall" title="Create Schedule" cancel-variant="outline-secondary" ok-title="Cancel" ok-only>
        <b-row>
            <b-col cols="12">
                <h5 class="mb-2">SCHEDULE INFO</h5>
                <b-row class="ml-1">
                    <b-col cols="6">
                        <b-form-group label="Year" label-for="h-first-name" label-cols-md="4">
                            <v-select v-model="selectedYearForm" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="years" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group label="Week" label-for="h-first-name" label-cols-md="4">
                            <v-select v-model="selectedWeekForm" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="weeks" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group label="From Date" label-for="h-first-name" label-cols-md="4">
                            <b-form-datepicker v-model="from_date" :date-disabled-fn="dateDisabled" locale="en" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group label="To Date" label-for="h-first-name" label-cols-md="4">
                            <b-form-datepicker v-model="to_date" :date-disabled-fn="dateDisabled" locale="en" />
                        </b-form-group>
                    </b-col>
                </b-row>

            </b-col>
            <b-col cols="12">
                <h5 class="mb-2 mt-2">DRIVERS DETAILS</h5>

                <b-row class="ml-1">
                    <b-col cols="12">
                        <b-form-group label="Driver" label-for="h-first-name" label-cols-md="4">
                            <v-select v-model="selectedDriver" @input="setPhone(selectedDriver)" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="drivers" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group label="Phone" label-for="h-first-name" label-cols-md="4">
                            <b-form-input v-model="phonenumber" id="h-first-name" placeholder="Please enter a phonenumber" />
                        </b-form-group>
                    </b-col>
                </b-row>

            </b-col>
            <b-col cols="12">
                <h5 class="mb-2 mt-2">TIMING</h5>

                <b-row class="ml-1">
                    <b-col cols="6" class="justify-content-center d-flex">
                        <b-form-checkbox @change="onSameTime" value="sametime" class="custom-control-primary">
                            <p style="font-size: 12px">Select this checkbox to apply same time for all days</p>
                        </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" class="justify-content-center d-flex">
                        <b-form-checkbox @change="onSameTractor" value="sametractor" class="custom-control-primary">
                            <p style="font-size: 12px">Select this checkbox to apply same tractor for all days</p>
                        </b-form-checkbox>
                    </b-col>
                    <b-col class="mt-1" cols="2">
                        Saturday
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <flat-pickr v-model="sat_value" class="form-control" :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i',}" />
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <v-select v-model="sat_tractor_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="tractors" />
                    </b-col>
                    <b-col class="mt-1" cols="2">
                        Sunday
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <flat-pickr v-model="sun_value" class="form-control" :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i',}" />
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <v-select v-model="sun_tractor_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="tractors" />
                    </b-col>
                    <b-col class="mt-1" cols="2">
                        Monday
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <flat-pickr v-model="mon_value" class="form-control" :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i',}" />
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <v-select v-model="mon_tractor_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="tractors" />
                    </b-col>
                    <b-col class="mt-1" cols="2">
                        Tuesday
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <flat-pickr v-model="tue_value" class="form-control" :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i',}" />
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <v-select v-model="tue_tractor_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="tractors" />
                    </b-col>
                    <b-col class="mt-1" cols="2">
                        Wednesday
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <flat-pickr v-model="wed_value" class="form-control" :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i',}" />
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <v-select v-model="wed_tractor_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="tractors" />
                    </b-col>
                    <b-col class="mt-1" cols="2">
                        Thursday
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <flat-pickr v-model="thu_value" class="form-control" :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i',}" />
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <v-select v-model="thu_tractor_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="tractors" />
                    </b-col>
                    <b-col class="mt-1" cols="2">
                        Friday
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <flat-pickr v-model="fri_value" class="form-control" :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i',}" />
                    </b-col>
                    <b-col class="mt-1" cols="5">
                        <v-select v-model="fri_tractor_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="tractors" />
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12">
                <b-button @click="onSave" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">
                    Save Schedule
                </b-button>
            </b-col>
        </b-row>
    </b-modal>
</b-card>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
    BRow,
    BCol,
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
    BButtonGroup,
    BCardBody,
    BCard,
    BModal,
    BFormDatepicker,
    BFormCheckbox,
    VBModal,
} from 'bootstrap-vue'
import axios from 'axios'
import vSelect from 'vue-select'
import {
    mapState
} from 'vuex'
import {
    serverUri
} from '@/config'
import Ripple from 'vue-ripple-directive'
import {
    getUserData
} from "@/auth/utils";
import store from '@/store'
import flatPickr from 'vue-flatpickr-component'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
    components: {
        BCardCode,
        BRow,
        BCol,
        BCard,
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
        BFormDatepicker,
        BButtonGroup,
        BCardBody,
        BFormCheckbox,
        BModal,
        flatPickr,
        vSelect,
    },
    data() {
        return {
            sat_value: null,
            sun_value: null,
            mon_value: null,
            tue_value: null,
            wed_value: null,
            thu_value: null,
            fri_value: null,
            sat_tractor_id: 'OFF',
            sun_tractor_id: 'OFF',
            mon_tractor_id: 'OFF',
            tue_tractor_id: 'OFF',
            wed_tractor_id: 'OFF',
            thu_tractor_id: 'OFF',
            fri_tractor_id: 'OFF',
            perPage: 25,
            pageOptions: [5, 10, 15, 25],
            totalRows: 1,
            currentPage: 1,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            infoModal: {
                id: 'info-modal',
                title: '',
                content: '',
            },
            fields: [{
                    key: 'id',
                    label: 'ACTION'
                },
                {
                    key: 'driver',
                    label: 'DRIVER',
                    sortable: true
                },
                {
                    key: 'saturday',
                    label: 'SATURDAY',
                    sortable: true
                },
                {
                    key: 'sunday',
                    label: 'SUNDAY',
                    sortable: true
                },
                {
                    key: 'monday',
                    label: 'MONDAY',
                    sortable: true
                },
                {
                    key: 'tuesday',
                    label: 'TUESDAY',
                    sortable: true
                },
                {
                    key: 'wednesday',
                    label: 'WEDNESDAY',
                    sortable: true
                },
                {
                    key: 'thursday',
                    label: 'THURSDAY',
                    sortable: true
                },
                {
                    key: 'friday',
                    label: 'FRIDAY',
                    sortable: true
                },
            ],
            /* eslint-disable global-require */
            items: [],
            selectedYear: null,
            selectedWeek: null,
            selectedYearForm: null,
            selectedWeekForm: null,
            years: [],
            weeks: [],
            from_date: null,
            to_date: null,
            tractors: [],
            drivers: [],
            selectedDriver: null,
            phonenumber: null,
            checkDrivers: [],
        }
    },
    directives: {
        Ripple,
        'b-modal': VBModal,
    },
    computed: {
        ...mapState({
            year: state => state.schedule.year,
            week: state => state.schedule.week,
            domicile: state => state.schedule.domicile,
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

        const currentDate = new Date();

        this.selectedYear = currentDate.getFullYear();
        this.selectedYearForm = currentDate.getFullYear();

        const startDate = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));

        var weekNumber = Math.ceil(days / 7);

        for (let i = this.selectedYear - 3; i <= this.selectedYear; i++) {
            this.years.push(i);
        }

        for (let i = 1; i <= 52; i++) {
            this.weeks.push(i);
        }

        this.selectedWeek = weekNumber
        this.selectedWeekForm = weekNumber

        const sunday = new Date(this.selectedYearForm, 0, (1 + (this.selectedWeekForm - 1) * 7));
        while (sunday.getDay() !== 0) {
            sunday.setDate(sunday.getDate() - 1);
        }

        this.from_date = sunday
        this.to_date = sunday

        axios.post(`${serverUri}/schedule/getform`, {
            company: getUserData().company_id
        }).then(res => {
            let driversData = [];
            let tractorsData = [];

            res.data.drivers.map(item => {
                driversData.push({
                    title: `${item.driver_id} - ${item.driver_name}`,
                    phone: item.phone
                })
            });
            
            tractorsData.push({ title: 'OFF' })
            res.data.tractors.map(item => {
                tractorsData.push({
                    title: `${item.tractor_id}`
                })
            })

            this.drivers = driversData
            this.tractors = tractorsData
        })

        axios.post(`${serverUri}/schedule/getschedule`, {
            company: getUserData().company_id,
            year: currentDate.getFullYear(),
            week: weekNumber,
            domicile: ''
        }).then(res => {
            res.data.map((item, index) => {
                this.items.push({
                    id: item.scheduleID,
                    driver: item.driverID + '+' + item.driver_name,
                    saturday: `${item.sat_start_time}${item.sat_tractor_id ? '-' + item.sat_tractor_id : ''}`,
                    sunday: `${item.sun_start_time}${item.sun_tractor_id ? '-' + item.sun_tractor_id : ''}`,
                    monday: `${item.mon_start_time}${item.mon_tractor_id ? '-' + item.mon_tractor_id : ''}`,
                    tuesday: `${item.tue_start_time}${item.tue_tractor_id ? '-' + item.tue_tractor_id : ''}`,
                    wednesday: `${item.wed_start_time}${item.wed_tractor_id ? '-' + item.wed_tractor_id : ''}`,
                    thursday: `${item.thu_start_time}${item.thu_tractor_id ? '-' + item.thu_tractor_id : ''}`,
                    friday: `${item.fri_start_time}${item.fri_tractor_id ? '-' + item.fri_tractor_id : ''}`,
                    send_sms: '',
                })
            })
        });
    },
    methods: {
        sendSMS() {
            this.$swal({
                title: 'Error!',
                text: 'Please choose the schedules for sending sms.',
                icon: 'error',
                customClass: {
                    confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
            })
        },
        setPhone(driver) {
            this.phonenumber = driver.phone
        },
        onSameTime(id) {
            if (id === 'sametime') {
                this.sun_value = this.sat_value;
                this.mon_value = this.sat_value;
                this.tue_value = this.sat_value;
                this.wed_value = this.sat_value;
                this.thu_value = this.sat_value;
                this.fri_value = this.sat_value;
            }
        },
        onSameTractor(id) {
            if (id === 'sametractor') {
                this.sun_tractor_id = this.sat_tractor_id;
                this.mon_tractor_id = this.sat_tractor_id;
                this.tue_tractor_id = this.sat_tractor_id;
                this.wed_tractor_id = this.sat_tractor_id;
                this.thu_tractor_id = this.sat_tractor_id;
                this.fri_tractor_id = this.sat_tractor_id;
            }
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
        arrangeData(data) {
            let array = [];

            data.map((item, index) => {
                array.push({
                    id: item.scheduleID,
                    driver: item.driverID + '+' + item.driver_name,
                    saturday: `${item.sat_start_time}${item.sat_tractor_id ? '-' + item.sat_tractor_id : ''}`,
                    sunday: `${item.sun_start_time}${item.sun_tractor_id ? '-' + item.sun_tractor_id : ''}`,
                    monday: `${item.mon_start_time}${item.mon_tractor_id ? '-' + item.mon_tractor_id : ''}`,
                    tuesday: `${item.tue_start_time}${item.tue_tractor_id ? '-' + item.tue_tractor_id : ''}`,
                    wednesday: `${item.wed_start_time}${item.wed_tractor_id ? '-' + item.wed_tractor_id : ''}`,
                    thursday: `${item.thu_start_time}${item.thu_tractor_id ? '-' + item.thu_tractor_id : ''}`,
                    friday: `${item.fri_start_time}${item.fri_tractor_id ? '-' + item.fri_tractor_id : ''}`,
                    send_sms: '',
                })
            })

            this.items = array;
        },
        onCheckDriver(id) {
            const isCheck = this.checkDrivers.find((item) => item === id);

            if (isCheck) {
                this.checkDrivers.map((item, index) => {
                    if (item === id) this.checkDrivers.splice(index, 1);
                });
            } else {
                this.checkDrivers.push(id);
            }
        },
        onSave() {
            let saveData = {
                selyear: this.year,
                selweek: this.week,
                domicile: this.domicile,
                year: this.selectedYearForm,
                week: this.selectedWeekForm,
                from_date: this.from_date,
                to_date: this.to_date,
                driver: this.selectedDriver.title,
                phone: this.phonenumber,
                sat_tractor_id: this.sat_tractor_id.title,
                sat_value: this.sat_value,
                sun_tractor_id: this.sun_tractor_id.title,
                sun_value: this.sun_value,
                mon_tractor_id: this.mon_tractor_id.title,
                mon_value: this.mon_value,
                tue_tractor_id: this.tue_tractor_id.title,
                tue_value: this.tue_value,
                wed_tractor_id: this.wed_tractor_id.title,
                wed_value: this.wed_value,
                thu_tractor_id: this.thu_tractor_id.title,
                thu_value: this.thu_value,
                fri_tractor_id: this.fri_tractor_id.title,
                fri_value: this.fri_value,
                company: getUserData().company_id
            }

            axios.post(`${serverUri}/schedule/saveschedule`, saveData).then(res => {
                this.items.splice(0, this.items.length);

                res.data.map((item, index) => {
                    this.items.push({
                        id: item.scheduleID,
                        driver: item.driverID + '+' + item.driver_name,
                        saturday: `${item.sat_start_time}${item.sat_tractor_id ? '-' + item.sat_tractor_id : ''}`,
                        sunday: `${item.sun_start_time}${item.sun_tractor_id ? '-' + item.sun_tractor_id : ''}`,
                        monday: `${item.mon_start_time}${item.mon_tractor_id ? '-' + item.mon_tractor_id : ''}`,
                        tuesday: `${item.tue_start_time}${item.tue_tractor_id ? '-' + item.tue_tractor_id : ''}`,
                        wednesday: `${item.wed_start_time}${item.wed_tractor_id ? '-' + item.wed_tractor_id : ''}`,
                        thursday: `${item.thu_start_time}${item.thu_tractor_id ? '-' + item.thu_tractor_id : ''}`,
                        friday: `${item.fri_start_time}${item.fri_tractor_id ? '-' + item.fri_tractor_id : ''}`,
                        send_sms: '',
                    })
                })

                this.showToast('success', 'Success', 'The schedule has been saved')
            })
        },
        onRemove() {
            if (this.checkDrivers.length === 0) {
                this.showToast('danger', 'Failure', 'Please select schedules.')
            } else {

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
                        axios.post(`${serverUri}/schedule/deleteschedule`, {
                            list: this.checkDrivers,
                            company: getUserData().company_id,
                            year: this.year,
                            week: this.week,
                            domicile: this.domicile
                        }).then(res => {
                            this.arrangeData(res.data)
                            this.showToast('success', 'Success', 'The schedule has been deleted.')

                        })

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
            }

        },
        dateDisabled(ymd, date) {

            const sunday = new Date(this.selectedYearForm, 0, (1 + (this.selectedWeekForm - 1) * 7));

            while (sunday.getDay() !== 0) {
                sunday.setDate(sunday.getDate() - 1);
            }

            const monthSunday = sunday.getMonth()

            // Disable weekends (Sunday = `0`, Saturday = `6`) and
            // disable days that fall on the 13th of the month
            const day = date.getDate()
            const weekday = date.getDay()
            const month = date.getMonth()

            // Return `true` if the date should be disabled
            return !((day === sunday.getDate() || day === sunday.getDate() + 1 || day === sunday.getDate() + 2 || day === sunday.getDate() + 3 || day === sunday.getDate() + 4 || day === sunday.getDate() + 5 || day === sunday.getDate() + 6) && monthSunday === month)
        },
        showToast(variant, title, text) {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: title,
                    icon: "BellIcon",
                    text: text,
                    variant,
                },
            });
        },
    },
    watch: {
        "$store.state.schedule.year": {
            handler: function (nv) {
                if (nv) {
                    axios.post(`${serverUri}/schedule/getschedule`, {
                        company: getUserData().company_id,
                        year: nv,
                        week: this.week,
                        domicile: this.domicile
                    }).then(res => {
                        this.arrangeData(res.data)
                    });
                }
            },
            immediate: true // provides initial (not changed yet) state
        },
        "$store.state.schedule.week": {
            handler: function (nv) {
                if (nv) {
                    axios.post(`${serverUri}/schedule/getschedule`, {
                        company: getUserData().company_id,
                        year: this.year,
                        week: nv,
                        domicile: this.domicile
                    }).then(res => {
                        this.arrangeData(res.data)
                    });
                }
            },
            immediate: true // provides initial (not changed yet) state
        },
        "$store.state.schedule.domicile": {
            handler: function (nv) {
                if (nv) {
                    axios.post(`${serverUri}/schedule/getschedule`, {
                        company: getUserData().company_id,
                        year: this.year,
                        week: this.week,
                        domicile: nv
                    }).then(res => {
                        this.arrangeData(res.data)
                    });
                }
            },
            immediate: true // provides initial (not changed yet) state
        }
    }
}

</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
