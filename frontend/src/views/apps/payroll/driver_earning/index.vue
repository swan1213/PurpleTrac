<template lang="">
<div>
    <b-card no-body>
        <b-card-header>
            <h3>Driver Payroll Report</h3>
        </b-card-header>
        <b-card-body>
            <b-row class="d-flex align-items-center mb-1">
                <b-col md="6" sm="8" xs="7">
                    <b-form-group>
                        <b-form-input v-model="driver_name" id="driver_name" placeholder="Driver Name" />
                    </b-form-group>
                </b-col>
                <b-col md="2" sm="4" xs="5">
                    <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" @click="handleChange">
                        Search
                    </b-button>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Date Range">
                        <flat-pickr v-model="rangeDate" class="form-control" :config="{ mode: 'range'}" />
                    </b-form-group>
                </b-col>
                <b-col md="3">
                    <b-form-group label="Payment Date">
                        <flat-pickr v-model="paymentDate" class="form-control" />
                    </b-form-group>
                </b-col>
                <b-col md="3">
                    <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary">Send Reports</b-button>
                </b-col>
            </b-row>
            <b-table striped hover responsive class="position-relative payroll-table" :per-page="perPage" :current-page="currentPage" :items="dataSource" :fields="fields" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                <!-- <template #cell(checkbox)="data">
                    <b-form-checkbox />
                </template> -->

                <template #cell(action)="data">
                    <b-button @click="viewReport(data)" v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="primary">
                        <feather-icon icon="FileTextIcon" size="16" />
                        View Report
                    </b-button>
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
        </b-card-body>
    </b-card>
</div>
</template>

<script>
import {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    BTable,
    BButton,
    BPagination,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormCheckbox,
} from "bootstrap-vue";
import axios from "axios";
import Ripple from "vue-ripple-directive";
import { getUserData } from "@/auth/utils";
import flatPickr from 'vue-flatpickr-component'
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    serverUri
} from "@/config";

export default {
    components: {
        BRow,
        BCol,
        BCard,
        BCardHeader,
        BCardBody,
        BTable,
        BButton,
        BPagination,
        BForm,
        BFormGroup,
        BFormInput,
        BFormSelect,
        BFormCheckbox,
        flatPickr
    },
    directives: {
        Ripple
    },
    data() {
        return {
            dataSource: [],
            perPage: 5,
            pageOptions: [3, 5, 10],
            totalRows: 1,
            currentPage: 1,
            sortDesc: false,
            sortDirection: "desc",
            filter: " ",
            filterOn: [],
            fields: [{
                    key: "checkbox",
                    label: ""
                },
                {
                    key: "no",
                    label: "No",
                    sortable: true
                },
                {
                    key: "driver_id",
                    label: "DRIVER ID",
                    sortable: true
                },
                {
                    key: "driver_name",
                    label: "NAME",
                    sortable: true
                },
                {
                    key: "email",
                    label: "EMAIL",
                    sortable: true
                },
                // {
                //     key: "phone",
                //     label: "PHONE",
                //     sortable: true
                // },
                // {
                //     key: "license",
                //     label: "LICENSE",
                //     sortable: true
                // },
                // {
                //     key: "address",
                //     label: "ADDRESS",
                //     sortable: true
                // },
                {
                    key: "action",
                    label: "ACTION"
                },
            ],
            driver_name: null,
            rangeDate: null,
            paymentDate: null,
        };
    },
    created() {
        const company = getUserData().company_id;
        
        axios.get(`${serverUri}/api/payroll/earningIndex/${company}`).then((res) => {
            this.dataSource = res.data.map((p, i) => {
                return {
                    ...p,
                    no: i + 1
                };
            });
        });
    },
    methods: {
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        handleChange() {
            axios.get(`${serverUri}/api/payroll/searchdriver/${this.driver_name ? this.driver_name : 'all'}`).then(res => {
                this.dataSource = res.data.map((p, i) => {
                    return {
                        ...p,
                        no: i + 1
                    };
                });
            });
        },
        viewReport(data) {
            if (this.rangeDate && this.paymentDate) {
                this.$router.push({
                    name: 'apps-payroll-report',
                    params: {
                        id: data.item.id,
                        company: data.item.company_id,
                        dateRange: this.rangeDate,
                        paymentDate: this.paymentDate,
                    }
                });
            } else {
                this.showToast('warning', 'warning', 'Please select payment date and range date.')
            }
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
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style>
.payroll-table th,td {
    white-space: nowrap;
}
</style>