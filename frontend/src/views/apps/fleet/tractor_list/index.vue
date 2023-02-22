<template>
<b-card no-body>
    <b-card-header>
        <h3>Fleet List</h3>
    </b-card-header>

    <b-card-body>
        <div class="d-flex">
            <b-button v-b-modal.modal-center class="mr-2" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">
                <feather-icon icon="PlusIcon" class="mr-50" />
                Add Fleet
            </b-button>
            <b-button v-b-modal.modal-upload v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info">
                <feather-icon icon="UploadIcon" class="mr-50" />
                Upload
            </b-button>
        </div>
        <div class="d-flex justify-content-between  flex-wrap">

            <!-- sorting  -->
            <b-form-group label-align-sm="left" label-cols-sm="2" label-for="sortBySelect" class="mr-1 mb-md-0
            ">

            </b-form-group>

            <!-- filter -->
            <b-form-group label="Filter" label-cols-sm="2" label-align-sm="left" label-size="md" label-for="filterInput" class="mb-0">
                <b-input-group>
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

    <b-table striped hover responsive class="position-relative fleet-table" :per-page="perPage" :current-page="currentPage" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
        <template #cell(avatar)="data">
            <b-avatar :src="data.value" />
        </template>
        <template #cell(status)="data">
            <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
            </b-badge>
        </template>
        <template #cell(actions)="data">
            <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

                <template #button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                </template>

                <b-dropdown-item v-b-modal.modal-center @click="onEdit(data.item)">
                    <feather-icon icon="EditIcon" />
                    <span class="align-middle ml-50">Edit</span>
                </b-dropdown-item>

                <b-dropdown-item @click="onRemove(data.item.id)">
                    <feather-icon icon="TrashIcon" />
                    <span class="align-middle ml-50">Delete</span>
                </b-dropdown-item>
            </b-dropdown>
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

    <!-- modal vertical center -->
    <b-modal id="modal-upload" centered title="Upload Form" ok-only ok-title="Cancel">
        <!-- info -->
        <b-alert variant="info" show>
            <div class="alert-body">
                <span>While uploading data, old data will be updated !</span>
            </div>
        </b-alert>

        <!-- Styled -->
        <b-form-file v-model="file" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..." />

        <b-button class="mt-1" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="onUploadFleet">
            Upload CSV file
        </b-button>
        <xlsx-read :file="file" style="display: none">
            <xlsx-json :sheet="selectedSheet">
                <template #default="{ collection }">
                    <input type="text" :value="onSetFleet(collection)" />
                </template>
            </xlsx-json>
        </xlsx-read>

    </b-modal>

    <b-modal size="lg" id="modal-center" centered title="FLEET INFO FORM" ok-only ok-title="Cancel">
        <b-row>
            <b-col cols="12">
                <b-form-group label="Tractor" label-for="h-first-name" label-cols-md="2">
                    <b-form-input v-model="fleet.tractor_id" id="h-first-name" placeholder="Enter Tractor.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="Model" label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.model" id="h-first-name" placeholder="Enter Model.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="VIN" label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.vin" id="h-first-name" placeholder="Enter VIN.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="Year" label-for="h-first-name" label-cols-md="4">
                    <b-form-input type="number" v-model="fleet.year" id="h-first-name" placeholder="Enter Year.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="License Plate" label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.license_plate" id="h-first-name" placeholder="Enter License Plate.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="T Check" label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.t_check" id="h-first-name" placeholder="Enter T Check.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="Pre Pass" label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.pre_pass" id="h-first-name" placeholder="Enter Pre Pass.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="QIV" label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.qiv" id="h-first-name" placeholder="Enter QIV.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="BIT" label-for="h-first-name" label-cols-md="4">
                    <b-form-input type="date" v-model="fleet.bit" id="h-first-name" placeholder="Enter BIT.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="Book Value" label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.book_value" id="h-first-name" placeholder="Enter Book Value.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="Domicile" label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.domicile" id="h-first-name" placeholder="Enter Domicile.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="Domicile Email " label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.domicile_email" id="h-first-name" placeholder="Enter Domicile Email.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="VEDR" label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.vedr" id="h-first-name" placeholder="Enter VEDR.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="ELD" label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.eld" id="h-first-name" placeholder="Enter ELD.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="STL" label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.stl" id="h-first-name" placeholder="Enter STL.." />
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group label="LEASE" label-for="h-first-name" label-cols-md="4">
                    <b-form-input v-model="fleet.lease" id="h-first-name" placeholder="Enter LEASE.." />
                </b-form-group>
            </b-col>
            <b-col cols="12">
                <b-button @click="onSave" variant="primary">
                    Save Fleet
                </b-button>
            </b-col>
        </b-row>
    </b-modal>
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
    XlsxDownload,
} from "vue-xlsx/dist/vue-xlsx.es.js";
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
    BCard,
    BCardHeader,
    BCardBody,
    BModal,
    BAlert,
    BFormFile,
    VBModal,
    BDropdown,
    BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import {
    serverUri
} from '@/config'
import {
    getUserData
} from "@/auth/utils";
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
    components: {
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
        BCard,
        BCardHeader,
        BCardBody,
        BModal,
        BAlert,
        BFormFile,
        BDropdown,
        BDropdownItem,
        XlsxRead,
        XlsxTable,
        XlsxSheets,
        XlsxJson,
        XlsxWorkbook,
        XlsxSheet,
        XlsxDownload,
    },
    data() {
        return {
            file: null,
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
                    key: 'tractor_id',
                    label: 'TRACTOR #',
                    sortable: true
                },
                {
                    key: 'model',
                    label: 'MODEL',
                    sortable: true
                },
                {
                    key: 'vin',
                    label: 'VIN',
                    sortable: true
                },
                {
                    key: 'year',
                    label: 'YEAR',
                    sortable: true
                },
                {
                    key: 'bit',
                    label: 'BIT',
                    sortable: true
                },
                {
                    key: 'stl',
                    label: 'STL',
                    sortable: true
                },
                {
                    key: 'actions',
                    label: 'ACTION',
                },
            ],
            /* eslint-disable global-require */
            items: [],
            fleet: {
                tractor_id: null,
                model: null,
                vin: null,
                year: null,
                license_plate: null,
                t_check: null,
                pre_pass: null,
                qiv: null,
                bit: null,
                book_value: null,
                domicile: null,
                domicile_email: null,
                vedr: null,
                eld: null,
                stl: null,
                lease: null,
            },
            flag: 0,
            selectedSheet: "Sheet1",
            collection: [],
            fleetlist: [],
            sheets: [{
                name: "SheetOne",
                data: [{
                    c: 2
                }]
            }],
        }
    },
    directives: {
        Ripple,
        'b-modal': VBModal,
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
        axios.post(`${serverUri}/fleet/getfleet`, {
            company: getUserData().company_id
        }).then(res => {
            res.data.map(item => {
                item.bit = new Date(item.bit).toLocaleDateString();
            })
            this.items = res.data
            this.totalRows = this.items.length
        });
    },
    methods: {
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
        onSetFleet(data) {
            this.fleetlist = data;
        },
        onUploadFleet() {
            axios.post(`${serverUri}/fleet/uploadfleet`, {
                data: this.fleetlist,
                company: getUserData().company_id
            }).then(res => {
                if (res.data.length) {
                    res.data.map(item => {
                        item.bit = new Date(item.bit).toLocaleDateString();
                    })
                    this.items = res.data

                    this.showToast('success', 'Success', 'The csv file has been uploaded')
                }
            })
        },
        onSave() {
            if (this.flag) {
                axios.post(`${serverUri}/fleet/updatefleet`, this.fleet).then(res => {
                    if (res.data.affectedRows) {
                        this.showToast('success', 'Success', 'The fleet has been saved.')
                    } else {
                        this.showToast('warning', 'Failure', 'The updating functions is failed.')
                    }
                });
            } else {
                axios.post(`${serverUri}/fleet/savefleet`, {
                    ...this.fleet,
                    company: getUserData().company_id
                }).then(res => {
                    res.data.map(item => {
                        item.bit = new Date(item.bit).toLocaleDateString();
                    })
                    this.items = res.data

                    this.showToast('success', 'Success', 'The fleet has been saved.')
                });
            }

            this.flag = 0;
        },
        onEdit(data) {
            this.flag = 1;
            this.fleet = data
        },
        onRemove(id) {
            this.$swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-outline-danger ml-1",
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.value) {
                    axios.get(`${serverUri}/fleet/remove/${id}`).then(res => {
                        this.items.map((item, index) => {
                            if (item.id === id) this.items.splice(index, 1);
                        })

                        this.showToast('success', 'Success', 'The fleet has been removed');
                    })

                    this.$swal({
                        icon: "success",
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        customClass: {
                            confirmButton: "btn btn-success",
                        },
                    });
                }
            });

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
}
</script>

<style>
.fleet-table th,
td {
    white-space: nowrap;
}
</style>
