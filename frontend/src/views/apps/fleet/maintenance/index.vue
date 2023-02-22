<template>
<b-card no-body>
    <b-card-header>
        <h3>Maintenance Form List</h3>
    </b-card-header>

    <b-card-body>
        <div class="d-flex">
            <b-button v-b-modal.modal-center v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">
                <feather-icon icon="PlusIcon" class="mr-50" />
                Add Fleet
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

    <b-table striped hover responsive class="position-relative" :per-page="perPage" :current-page="currentPage" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
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

    <b-modal size="lg" id="modal-center" centered title="Maintenance Form" ok-only ok-title="Cancel">
        <b-row>
            <b-col md="6">
                <b-form-group label="Domicile" label-for="h-first-name" label-cols-md="4">
                    <v-select id="h-first-name" v-model="maintenance.domicile_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="domicile" :options="domiciles" />
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-form-group label="Tractor" label-for="h-first-name" label-cols-md="4">
                    <v-select id="h-first-name" v-model="maintenance.tractor_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="tractor_id" :options="tractors" />
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-form-group label="Person Completing Work" label-for="h-first-name" label-cols-md="4">
                    <b-form-input id="h-first-name" v-model="maintenance.person_completing_work" placeholder="Enter Completing Work.." />
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-form-group label="Date" label-for="h-first-name" label-cols-md="4">
                    <b-form-datepicker id="h-first-name" v-model="maintenance.date" class="mb-1" />
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-form-group label="Odometer" label-for="basicInput" label-cols-md="4">
                    <b-form-input type="number" id="basicInput" v-model="maintenance.odometer" placeholder="Enter Odometer.." />
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-form-group label="Costs" label-for="basicInput" label-cols-md="4">
                    <b-form-input type="number" id="basicInput" v-model="maintenance.costs" placeholder="Enter Costs.." />
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-form-group class="d-flex align-items-center" label="MMR Task" label-for="basicInput" label-cols-md="4">
                    <b-form-radio-group id="basicInput" v-model="maintenance.mmr_tasks" :options="elements" value-field="item" text-field="name" disabled-field="notEnabled" class="demo-inline-spacing" />
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-form-group class="d-flex align-items-center" label="Out Of Service" label-for="service" label-cols-md="4">
                    <b-form-radio-group id="service" v-model="maintenance.out_of_service" :options="elements" value-field="item" text-field="name" disabled-field="notEnabled" class="demo-inline-spacing" />
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-form-group label="Scheduled" label-for="schedule" label-cols-md="4">
                    <b-form-radio-group id="schedule" v-model="maintenance.scheduled" :options="elements" value-field="item" text-field="name" disabled-field="notEnabled" class="demo-inline-spacing" />
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="6" class="mb-2">
                <b-form-textarea id="textarea-default" v-model="maintenance.domfp" placeholder="Enter description of maintenance performed.." />
            </b-col>
            <b-col lg="6">
                <b-media class="mb-2 ml-2">
                    <template #aside>
                        <b-avatar ref="previewEl" :src="maintenance.photo = avatar" variant="light-primary" size="90px" rounded />
                    </template>
                    <div class="d-flex flex-wrap">
                        <b-button variant="primary" @click="$refs.refInputEl.click()">
                            <input ref="refInputEl" type="file" class="d-none" @input="inputImageRenderer">
                            <span class="d-none d-sm-inline">upload</span>
                        </b-button>
                        <b-button variant="outline-secondary" @click="onDeleteImage" class="ml-1">
                            <span class="d-none d-sm-inline">Remove</span>
                        </b-button>
                    </div>
                </b-media>
            </b-col>
        </b-row>
        <b-button @click="onSave" variant="primary">
            Save Maintenance
        </b-button>
    </b-modal>
</b-card>
</template>

<script>
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
    BFormDatepicker,
    BFormRadioGroup,
    BFormTextarea,
    BMedia,
    BDropdown,
    BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import {
    ref
} from '@vue/composition-api'
import {
    useInputImageRenderer
} from '@core/comp-functions/forms/form-utils'
import axios from 'axios'
import { serverUri } from '@/config'
import { getUserData } from "@/auth/utils";
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
        BFormDatepicker,
        BFormRadioGroup,
        BFormTextarea,
        BMedia,
        BDropdown,
        BDropdownItem,
        vSelect,
    },
    data() {
        return {
            elements: ['Yes', 'No'],
            selectedMMR: null,
            selectedService: null,
            selectedSchedule: null,
            date: null,
            status: [],
            selectedStatus: null,
            domiciles: [],
            selectedDomicile: null,
            tractors: [],
            selectedTractor: null,
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
            fields: [
                {
                    key: 'domicile_id',
                    label: 'DOMICILE',
                    sortable: true,
                },
                {
                    key: 'tractor_id',
                    label: 'TRACTOR #',
                    sortable: true,
                },
                {
                    key: 'person_completing_work',
                    label: 'PERSON COMPLETION WORK',
                    sortable: true
                },
                {
                    key: 'date',
                    label: 'DATE',
                    sortable: true
                },
                {
                    key: 'odometer',
                    label: 'ODOMETER',
                    sortable: true
                },
                {
                    key: 'costs',
                    label: 'COST',
                    sortable: true
                },
                {
                    key: 'mmr_tasks',
                    label: 'MMR TASK',
                    sortable: true
                },
                {
                    key: 'out_of_service',
                    label: 'OUT OF SERVICE',
                    sortable: true
                },
                {
                    key: 'scheduled',
                    label: 'SCHEDULED',
                    sortable: true
                },
                {
                    key: 'actions',
                    label: 'ACTION',
                },
            ],
            /* eslint-disable global-require */
            items: [],
            maintenance: {
                domicile_id: null,
                tractor_id: null,
                person_completing_work: null,
                date: null,
                odometer: null,
                costs: null,
                mmr_tasks: null,
                out_of_service: null,
                scheduled: null,
                domfp: null,
                photo: null,
            },
            flag: 0
        }
    },
    directives: {
        Ripple,
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

        axios.post(`${serverUri}/fleet/getmaintenance`, { company: getUserData().company_id }).then(res => {
            if (res.data) {
                res.data.map(item => {
                    item.date = new Date(item.date).toLocaleDateString();
    
                    item.mmr_tasks = item.mmr_tasks ? 'Yes' : 'No';
                    item.out_of_service = item.out_of_service ? 'Yes' : 'No';
                    item.scheduled = item.scheduled ? 'Yes' : 'No';
                })
    
                this.items = res.data
                this.totalRows = this.items.length
            }
        });

        axios.post(`${serverUri}/schedule/getdomicile`, { company: getUserData().company_id }).then(res => {
            this.domiciles = res.data
        });

        axios.post(`${serverUri}/fleet/gettractor`, { company: getUserData().company_id }).then(res => {
            this.tractors = res.data;
        })
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
        onSave() {
            if (this.flag) {
                this.maintenance.mmr_tasks = this.maintenance.mmr_tasks === 'Yes' ? 1 : 0;
                this.maintenance.out_of_service = this.maintenance.out_of_service === 'Yes' ? 1 : 0;
                this.maintenance.scheduled = this.maintenance.scheduled === 'Yes' ? 1 : 0;
    
                axios.post(`${serverUri}/fleet/updatemaintenance`, {...this.maintenance, company: getUserData().company_id}).then(res => {
                    if (res.data.affectedRows) {
                        this.showToast('success', 'Success', 'The data has been saved.')
                    } else {
                        this.showToast('warning', 'Failure', 'Failed to update the data')
                    }
    
                })

                this.maintenance.mmr_tasks = this.maintenance.mmr_tasks ? 'Yes' : 'No';
                this.maintenance.out_of_service = this.maintenance.out_of_service ? 'Yes' : 'No';
                this.maintenance.scheduled = this.maintenance.scheduled ? 'Yes' : 'No';
            } else {
                this.maintenance.mmr_tasks = this.maintenance.mmr_tasks === 'Yes' ? 1 : 0;
                this.maintenance.out_of_service = this.maintenance.out_of_service === 'Yes' ? 1 : 0;
                this.maintenance.scheduled = this.maintenance.scheduled === 'Yes' ? 1 : 0;
    
                axios.post(`${serverUri}/fleet/savemaintenance`, {...this.maintenance, company: getUserData().company_id}).then(res => {
                    this.items.splice(0, this.items.length)
                    res.data.map(item => {
                        item.date = new Date(item.date).toLocaleDateString();

                        item.mmr_tasks = item.mmr_tasks ? 'Yes' : 'No';
                        item.out_of_service = item.out_of_service ? 'Yes' : 'No';
                        item.scheduled = item.scheduled ? 'Yes' : 'No';
                    })

                    this.items = res.data
                    this.totalRows = this.items.length
    
                    this.showToast('success', 'Success', 'The data has been saved.')
                })
            }

            this.flag = 0;
        },
        onEdit(data) {
            this.maintenance = data;
            this.domicile_id = { domicile: this.domicile_id }
            this.tractor_id = { tractor_id: this.tractor_id }

            this.flag = 1;
        },
        onRemove(id) {
            axios.delete(`${serverUri}/fleet/deletefleet/${id}`).then(res => {
                if (res.data.affectedRows) {
                    this.items.map((item, index) => {
                        if (item.id === id) this.items.splice(index, 1);
                    })

                    this.totalRows = this.items.length
                    this.showToast('success', 'Success', 'The data has been removed')
                }
            })
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
    props: {
        avatar: {
            type: String,
        },
    },
    setup(props) {
        const refInputEl = ref(null)
        const previewEl = ref(null)

        const {
            inputImageRenderer
        } = useInputImageRenderer(refInputEl, base64 => {
            // eslint-disable-next-line no-param-reassign

            props.avatar = base64
        })

        const onDeleteImage = () => {
            props.avatar = null
        }

        return {
            onDeleteImage,
            refInputEl,
            previewEl,
            inputImageRenderer
        }
    }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
