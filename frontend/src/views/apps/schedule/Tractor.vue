<template>
<b-card no-body>
    <b-card-body>
        <div class="d-flex justify-content-between  flex-wrap">

            <!-- sorting  -->
            <b-button-group label-align-sm="left" label-cols-sm="2" label-for="sortBySelect" class="mr-1 mb-md-0">
                <b-button v-b-modal.modal-tall v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary">
                    Add
                </b-button>
                <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary">
                    Remove
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
        <template #cell(saturday)="data">
            <b-badge v-if="data.item.saturday === 'Available'" variant="light-success">
                {{ data.item.saturday }}
            </b-badge>
            <div v-else>
                {{ data.item.saturday }}
            </div>
        </template>
        <template #cell(sunday)="data">
            <b-badge v-if="data.item.sunday === 'Available'" variant="light-success">
                {{ data.item.sunday }}
            </b-badge>
            <div v-else>
                {{ data.item.sunday }}
            </div>
        </template>
        <template #cell(monday)="data">
            <b-badge v-if="data.item.monday === 'Available'" variant="light-success">
                {{ data.item.monday }}
            </b-badge>
            <div v-else>
                {{ data.item.monday }}
            </div>
        </template>
        <template #cell(tuesday)="data">
            <b-badge v-if="data.item.tuesday === 'Available'" variant="light-success">
                {{ data.item.tuesday }}
            </b-badge>
            <div v-else>
                {{ data.item.tuesday }}
            </div>
        </template>
        <template #cell(wednesday)="data">
            <b-badge v-if="data.item.wednesday === 'Available'" variant="light-success">
                {{ data.item.wednesday }}
            </b-badge>
            <div v-else>
                {{ data.item.wednesday }}
            </div>
        </template>
        <template #cell(thursday)="data">
            <b-badge v-if="data.item.thursday === 'Available'" variant="light-success">
                {{ data.item.thursday }}
            </b-badge>
            <div v-else>
                {{ data.item.thursday }}
            </div>
        </template>
        <template #cell(friday)="data">
            <b-badge v-if="data.item.friday === 'Available'" variant="light-success">
                {{ data.item.friday }}
            </b-badge>
            <div v-else>
                {{ data.item.friday }}
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
    <b-modal id="modal-tall" title="Overflowing Content" cancel-variant="outline-secondary" cancel-title="Cancel">

    </b-modal>
</b-card>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
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
    VBModal,
} from 'bootstrap-vue'
import axios from 'axios'
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

export default {
    components: {
        BCardCode,
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
        BButtonGroup,
        BCardBody,
        BModal,
    },
    data() {
        return {
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
                    key: 'tractor',
                    label: 'TRACTOR ID',
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
        const startDate = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));

        var weekNumber = Math.ceil(days / 7);

        axios.post(`${serverUri}/schedule/gettractor`, {
            company: getUserData().company_id,
            year: currentDate.getFullYear(),
            week: weekNumber,
            domicile: this.domicile
        }).then(res => {
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
        arrangeData(data) {
            this.items.splice(0, this.items.length)

            data.tractor.map((item, index) => {
                let cache = {
                    tractor: item.tractor_id,
                    saturday: null,
                    sunday: null,
                    monday: null,
                    tuesday: null,
                    wednesday: null,
                    thursday: null,
                    friday: null,
                };

                data.schedule.map(fleet => {
                    cache.tractor = item.tractor_id;
                    cache.saturday = `${fleet.sat_tractor_id === item.tractor_id && (cache.saturday === null || cache.saturday === 'Available') ? (fleet.sat_start_time === 'OFF' ? 'Available' : fleet.sat_start_time ) : 'Available'}`;
                    cache.sunday = `${fleet.sun_tractor_id === item.tractor_id && (cache.sunday === null || cache.sunday === 'Available') ? (fleet.sun_start_time === 'OFF' ? 'Available' : fleet.sun_start_time ) : 'Available'}`;
                    cache.monday = `${fleet.mon_tractor_id === item.tractor_id && (cache.monday === null || cache.monday === 'Available') ? (fleet.mon_start_time === 'OFF' ? 'Available' : fleet.mon_start_time ) : 'Available'}`;
                    cache.tuesday = `${fleet.tue_tractor_id === item.tractor_id && (cache.tuesday === null || cache.tuesday === 'Available') ? (fleet.tue_start_time === 'OFF' ? 'Available' : fleet.tue_start_time ) : 'Available'}`;
                    cache.wednesday = `${fleet.wed_tractor_id === item.tractor_id && (cache.wednesday === null || cache.wednesday === 'Available') ? (fleet.wed_start_time === 'OFF' ? 'Available' : fleet.wed_start_time ) : 'Available'}`;
                    cache.thursday = `${fleet.thu_tractor_id === item.tractor_id && (cache.thursday === null || cache.thursday === 'Available') ? (fleet.thu_start_time === 'OFF' ? 'Available' : fleet.thu_start_time ) : 'Available'}`;
                    cache.friday = `${fleet.fri_tractor_id === item.tractor_id && (cache.friday === null || cache.friday === 'Available') ? (fleet.fri_start_time === 'OFF' ? 'Available' : fleet.fri_start_time ) : 'Available'}`;
                })

                this.items.push(cache);
            })
        }
    },
    watch: {
        "$store.state.schedule.year": {
            handler: function (nv) {
                if (nv) {
                    axios.post(`${serverUri}/schedule/gettractor`, {
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
                    axios.post(`${serverUri}/schedule/gettractor`, {
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
                    axios.post(`${serverUri}/schedule/gettractor`, {
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
