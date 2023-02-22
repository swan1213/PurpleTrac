<template>
<b-card no-body>
    <b-card-header>
        <h3>Drivers</h3>
    </b-card-header>
    <b-card-body>
        <!-- button group  -->
        <b-button-group label-size="sm" class="mb-1">
            <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" v-b-toggle.sidebar-right @click="onAddDriver">
                Add Driver
            </b-button>
            <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" v-b-modal.modal-center>
                Add Bulk Drivers
            </b-button>
            <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" @click="onRemoveDriver">
                Remove Bulk
            </b-button>
        </b-button-group>
        <div class="d-flex justify-content-between flex-wrap">
            <v-select @input="onChangeStatus(selectedStatus)" style="width: 250px" label-align-sm="left" class="mr-1 mb-md-0" v-model="selectedStatus" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="workingStatus" />
        </div>
    </b-card-body>

    <b-table striped hover responsive class="position-relative" :per-page="perPage" :current-page="currentPage" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
        <template #cell(id)="data">
            <b-form-checkbox :value="data.item.id" class="custom-control-primary" @change="onCheckDriver(data.item.id)" />
        </template>
        <template #cell(avatar)="data">
            <b-avatar :src="data.item.photo" />
        </template>
        <!-- Column: Action -->
        <template #cell(action)="data">
            <span>
                <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                    <template v-slot:button-content>
                        <feather-icon icon="MoreVerticalIcon" size="16" class="text-body align-middle mr-25" />
                    </template>
                    <b-dropdown-item v-b-toggle.sidebar-right @click="onEditDriver(data.item)">
                        <feather-icon icon="Edit2Icon" class="mr-50" />
                        <span>Edit</span>
                    </b-dropdown-item>
                    <b-dropdown-item @click="onDeleteDriver(data.item.id)">
                        <feather-icon icon="TrashIcon" class="mr-50" />
                        <span>Delete</span>
                    </b-dropdown-item>
                </b-dropdown>
            </span>
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
    <b-sidebar id="sidebar-right" bg-variant="white" sidebar-class="sidebar-lg" right backdrop shadow>
        <add-driver />
    </b-sidebar>

    <!-- modal vertical center -->
    <b-modal id="modal-center" centered title="Upload Form" ok-only ok-title="Cancel">
        <!-- info -->
        <b-alert variant="info" show>
            <div class="alert-body">
                <span>While uploading data, old data will be updated !</span>
            </div>
        </b-alert>
        <b-row>
            <b-col cols="12">
                <b-form-file v-model="file" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..." />
            </b-col>
            <b-col cols="12">
                <b-button class="mt-1" @click="onUploadDriver" variant="primary">
                    Upload CSV File
                </b-button>
                <xlsx-read :file="file" style="display: none">
                    <xlsx-json :sheet="selectedSheet">
                        <template #default="{ collection }">
                            <input type="text" :value="onSetDriver(collection)" />
                        </template>
                    </xlsx-json>
                </xlsx-read>
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
    BCard,
    BModal,
    BCardHeader,
    BCardBody,
    BDropdown,
    BDropdownItem,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButtonGroup,
    BButton,
    BAlert,
    BSidebar,
    VBToggle,
    VBModal,
    BFormFile,
    BFormCheckbox,
} from "bootstrap-vue";
import axios from "axios";
import {
    serverUri
} from "@/config";
import Ripple from "vue-ripple-directive";
import {
    mapState,
    mapActions
} from "vuex";
import vSelect from "vue-select";
import AddDriver from "./AddDriver.vue";
import {
    getUserData
} from "@/auth/utils";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    components: {
        BRow,
        BCol,
        BTable,
        BAvatar,
        BBadge,
        BCard,
        BAlert,
        BCardHeader,
        BCardBody,
        BDropdown,
        BDropdownItem,
        BFormGroup,
        BFormSelect,
        BPagination,
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
        BButtonGroup,
        BButton,
        BModal,
        BFormFile,
        BSidebar,
        AddDriver,
        BFormCheckbox,
        ToastificationContent,
        vSelect,
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
            drivers: [],
            perPage: 25,
            pageOptions: [5, 10, 15, 25],
            totalRows: 1,
            currentPage: 1,
            sortBy: "",
            sortDesc: false,
            sortDirection: "asc",
            filter: " ",
            filterOn: [],
            infoModal: {
                id: "info-modal",
                title: "",
                content: "",
            },
            fields: [{
                    key: "id",
                    label: "Id",
                },
                {
                    key: "avatar",
                    label: "Avatar",
                },
                {
                    key: "driver_id",
                    label: "DRIVER ID",
                    sortable: true,
                },
                {
                    key: "driver_name",
                    label: "NAME",
                    sortable: true,
                },
                {
                    key: "email",
                    label: "EMAIL",
                    sortable: true,
                },
                {
                    key: "phone",
                    label: "PHONE",
                    sortable: true,
                },
                {
                    key: "action",
                },
            ],
            selectedStatus: {
                title: "Working now",
                value: 1,
            },
            workingStatus: [{
                    title: "Working now",
                    value: 1,
                },
                {
                    title: "Not longer working",
                    value: 0,
                },
            ],
            checkDrivers: [],
            file: null,
            selectedSheet: "GFT Drivers (template)",
            sheetName: null,
            sheets: [{
                name: "SheetOne",
                data: [{
                    c: 2,
                }, ],
            }, ],
            collection: [{
                a: 1,
                b: 2,
            }, ],
        };
    },
    directives: {
        Ripple,
        "b-modal": VBModal,
        "b-toggle": VBToggle,
    },
    computed: {
        ...mapState({
            items: (state) => state.driversStore.driversList,
        }),
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter((f) => f.sortable)
                .map((f) => ({
                    text: f.label,
                    value: f.key,
                }));
        },
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length;
    },
    created() {
        const company = getUserData().role === 'Super Admin' ? 0 : getUserData().company_id;

        axios.get(`${serverUri}/drivers/alldrivers/${company}`).then((res) => {

            this.addDriverAction(
                res.data.filter(
                    (item) => item.work_status === this.selectedStatus.value
                )
            );
        });
    },
    methods: {
        ...mapActions("driversStore", [
            "addDriverAction",
            "editDriverAction",
            "removeDriverAction",
        ]),
        onChange(event) {
            this.file = event.target.files ? event.target.files[0] : null;
        },
        addSheet() {
            this.sheets.push({
                name: this.sheetName,
                data: [...this.collection],
            });
            this.sheetName = null;
        },
        info(item, index, button) {
            this.infoModal.title = `Row index: ${index}`;
            this.infoModal.content = JSON.stringify(item, null, 2);
            this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        },
        resetInfoModal() {
            this.infoModal.title = "";
            this.infoModal.content = "";
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        onChangeStatus(status) {
            const company = getUserData().role === 'Super Admin' ? 0 : getUserData().company_id;

            axios.get(`${serverUri}/drivers/alldrivers/${company}`).then((res) => {
                this.addDriverAction(
                    res.data.filter((item) => item.work_status === status.value)
                );
            });
        },
        onSetDriver(data) {
            this.drivers = data;
        },
        onEditDriver(data) {
            this.editDriverAction(data);
        },
        onAddDriver() {
            this.editDriverAction({
                driver_id: null,
                driver_name: null,
                email: null,
                phone: null,
                license: null,
                address: null,
                price_per_mile: null,
                work_status: {
                    title: this.selectedStatus.title,
                    value: this.selectedStatus.value,
                },
                photo: null,
                domicile: null,
            });
        },
        onRemoveDriver() {
            if (this.checkDrivers.length) {

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
                        axios
                            .post(`${serverUri}/drivers/removedriver`, this.checkDrivers)
                            .then((res) => {
                                if (res.data)
                                    this.showToast(
                                        "success",
                                        "Success",
                                        "The drivers have been removed"
                                    );

                                this.checkDrivers.splice(0, this.checkDrivers.length)

                                this.addDriverAction(
                                    res.data.filter(
                                        (item) => item.work_status === this.selectedStatus.value
                                    )
                                );
                            });

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

            } else {
                this.showToast(
                    "warning",
                    "Warning",
                    "Please select drivers you are gonna remove."
                );
            }
        },
        onDeleteDriver(id) {
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
                    axios
                        .delete(`${serverUri}/drivers/deletedriver/${id}`)
                        .then((res) => {
                            if (res.data)
                                this.showToast(
                                    "success",
                                    "Success",
                                    `The driver ${id} has been deleted.`
                                );

                            this.addDriverAction(
                                this.items.map((item, index) => {
                                    if (item.id !== id && item.work_status === this.selectedStatus.value)
                                        return item
                                })
                            );
                        });

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
        onUploadDriver() {
            const userData = getUserData();

            this.$swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Upload it!",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-outline-danger ml-1",
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.value) {
                    axios
                        .post(`${serverUri}/drivers/uploaddriver`, {
                            data: this.drivers,
                            company: userData.company_id,
                        })
                        .then((res) => {
                            this.addDriverAction(
                                res.data.filter(
                                    (item) => item.work_status === this.selectedStatus.value
                                )
                            );

                            this.showToast(
                                "success",
                                "Success",
                                "The CSV File has been uploaded"
                            );
                        });

                    this.$swal({
                        icon: "success",
                        title: "Uploaded!",
                        text: "Your file has been uploaded.",
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
                    icon: "BellIcon",
                    text: text,
                    variant,
                },
            });
        },
    },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
