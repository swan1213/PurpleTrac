<template>
<b-card no-body>
    <b-card-header>
        <h3>Company Payroll </h3>
    </b-card-header>

    <b-card-body>
        <div class="d-flex justify-content-between  flex-wrap">
            <div class="d-flex">
                <v-select class="select_date mb-1 mr-2" v-model="selectedYear" @input="onLoadTable" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="years" />
                <v-select class="select_date mb-1" v-model="selectedWeek" @input="onLoadTable" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="weeks" />
            </div>
            <!-- <b-form-group> -->
            <!-- </b-form-group>
            <b-form-group> -->
            <!-- </b-form-group> -->
            <!-- <b-row style="width: 100%">
                <b-col md="3" sm="6" xs="6">
                </b-col>
                <b-col md="3" sm="6" xs="6">
                </b-col>
            </b-row> -->
            <!-- <v-select class="select_status mb-1" v-model="selectedStatus" @input="onLoadTable" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="status" />
            <xlsx-workbook>
                <xlsx-sheet :collection="items.length ? items : [{ message: 'There is no data' }]" key="Sheet1" sheet-name="Sheet1" />
                <xlsx-download>
                    <b-button variant="primary"><feather-icon icon="DownloadIcon" class="mr-50" />Export Data</b-button>
                </xlsx-download>
            </xlsx-workbook> -->

            <!-- sorting  -->
            <b-form-group label="Filter" label-cols-sm="2" label-align-sm="left" label-size="sm" label-for="filterInput" class="mb-0">
                <b-input-group size="md">
                    <b-form-input id="filterInput" v-model="filter" type="search" placeholder="Type to Search" />
                    <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">
                            Clear
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>

            <!-- filter -->
        </div>
    </b-card-body>

    <b-table striped hover responsive class="position-relative" :per-page="perPage" :current-page="currentPage" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
        <template #cell(name)="data">
            <b-link @click="onShowPayroll(data.item)" class="font-weight-bold d-block text-nowrap">
                {{ data.value }}
            </b-link>
        </template>
        <template #cell(price_for_fr)="data">
            {{ '$' + data.item.price_for_fr.toFixed(2) }}
        </template>
        <template #cell(price_excl_fr)="data">
            {{ '$' + data.item.price_excl_fr.toFixed(2) }}
        </template>
        <template #cell(price_per_mile)="data">
            <b-badge variant="light-info">
                {{ '$' + data.item.price_per_mile.toFixed(2) }}
            </b-badge>
        </template>
        <template #cell(total_miles)="data">
            <b-badge variant="light-warning">
                {{ data.item.total_miles }}
            </b-badge>
        </template>
        <template #cell(total_price)="data">
            <b-badge variant="light-success">
                {{ '$' + data.item.total_price.toFixed(2) }}
            </b-badge>
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
    BRow,
    BCol,
    BCard,
    BLink,
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
    BCardHeader,
    BCardBody,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import axios from 'axios'
import {
    serverUri
} from '@/config'
import {
    getUserData
} from "@/auth/utils";
import { mapActions } from 'vuex'

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
        BLink,
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
        vSelect
    },
    data() {
        return {
            perPage: 5,
            pageOptions: [3, 5, 10],
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
                    label: 'Id',
                },
                {
                    key: 'name',
                    label: 'DRIVER NAME',
                    sortable: true,
                },
                {
                    key: 'mi_for_fr',
                    label: 'MI.FOR FR',
                    sortable: true
                },
                {
                    key: 'price_for_fr',
                    label: 'PRICE FOR FR',
                    sortable: true
                },
                {
                    key: 'price_per_mile',
                    label: 'PRICE PER MILE',
                    sortable: true
                },
                {
                    key: 'mi_excl_fr',
                    label: 'MI.EXCL.FR',
                    sortable: true
                },
                {
                    key: 'price_excl_fr',
                    label: 'PRICE EXCL. FR',
                    sortable: true
                },
                {
                    key: 'total_miles',
                    label: 'TOTAL MILES',
                    sortable: true
                },
                {
                    key: 'total_price',
                    label: 'TOTAL PRICE',
                    sortable: true
                },
            ],
            /* eslint-disable global-require */
            items: [],
            selectedYear: null,
            selectedWeek: null,
            selectedStatus: {
                title: 'Working now',
                value: 1
            },
            years: [],
            weeks: [],
            status: [{
                title: 'Working now',
                value: 1
            }, {
                title: 'Not longer working',
                value: 0
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
    created() {
        const date = new Date();
        const currentYear = date.getFullYear();

        this.selectedYear = currentYear;

        const startDate = new Date(date.getFullYear(), 0, 1);
        var days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));

        this.selectedWeek = Math.ceil(days / 7);

        for (let i = currentYear - 3; i <= currentYear; i++) {
            this.years.push(i);
        }

        for (let i = 1; i <= 52; i++) {
            this.weeks.push(i);
        }

        this.onLoadTable();
    },
    methods: {
        ...mapActions('payrollStore', ['addPayrollAction', 'addFRAction']),
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
        onShowPayroll(data) {
            this.addPayrollAction({...data, year: this.selectedYear, week: this.selectedWeek, status: this.selectedStatus.title});

            this.$router.push({ name: 'apps-payroll-driver' });
        },
        onLoadTable() {
            this.items.splice(0, this.items.length);

            const company = getUserData().company_id;

            axios.post(`${serverUri}/api/payroll/allpayroll/${company}`, {
                year: this.selectedYear,
                week: this.selectedWeek,
                status: this.selectedStatus.value
            }).then(res => {
                this.addFRAction(res.data.rateSetting);

                // calculate total data
                res.data.driverData.map((item1, index) => {
                    const filtering = res.data.rateSetting.filter(item2 => item1.miles_qty >= item2.from_miles && item1.miles_qty <= item2.to_miles)

                    if (this.items.length && this.items[this.items.length - 1].name === item1.driver_name) {
                        this.items[this.items.length - 1].mi_for_fr += filtering.length ? item1.miles_qty : 0;
                        this.items[this.items.length - 1].price_for_fr += filtering.length ? filtering[0].fixed_rate : 0;
                        this.items[this.items.length - 1].mi_excl_fr += filtering.length ? 0 : item1.miles_qty;
                        this.items[this.items.length - 1].price_excl_fr += filtering.length ? 0 : item1.price_per_mile * item1.miles_qty;
                        this.items[this.items.length - 1].total_miles += item1.miles_qty;
                        this.items[this.items.length - 1].total_price += filtering.length ? filtering[0].fixed_rate : item1.price_per_mile * item1.miles_qty;
                    } else {
                        this.items.push({
                            id: this.items.length + 1,
                            name: item1.driver_name,
                            driver_id: item1.driver_id,
                            mi_for_fr: filtering.length ? item1.miles_qty : 0,
                            price_for_fr: filtering.length ? filtering[0].fixed_rate : 0,
                            price_per_mile: item1.price_per_mile,
                            mi_excl_fr: filtering.length ? 0 : item1.miles_qty,
                            price_excl_fr: filtering.length ? 0 : item1.price_per_mile * item1.miles_qty,
                            total_miles: item1.miles_qty,
                            total_price: filtering.length ? filtering[0].fixed_rate : item1.price_per_mile * item1.miles_qty,
                        });
                    }
                })

                this.totalRows = this.items.length
            });
        }
    },
}
</script>

<style>
.select_status {
    width: 23%;
}

@media only screen and (max-width: 768px) {
    .select_status {
        width: 100%;
    }
}
</style>
