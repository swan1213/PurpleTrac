<template>
<b-card no-body>
    <b-card-header>
        <h3>
            Search Form
        </h3>
    </b-card-header>

    <b-card-body>
        <b-tabs content-class="mt-1">

            <b-row>
                <b-col cols="3">
                    <b-form-group label="Year">
                        <v-select v-model="selectedYear" @input="onChangeYear(selectedYear)" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="years" />
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group label="Week">
                        <v-select v-model="selectedWeek" @input="onChangeWeek(selectedWeek)" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="weeks" />
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group label="Domicile">
                        <v-select v-model="selectedDomicile" @input="onChangeDomicile(selectedDomicile)" class="form-select" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="domicile" :options="domiciles" />
                    </b-form-group>

                </b-col>
            </b-row>

            <!-- This tabs content will always be mounted -->
            <b-tab title="Driver">

                <driver />
            </b-tab>

            <!-- This tabs content will not be mounted until the tab is shown -->
            <!-- and will be un-mounted when hidden -->
            <b-tab title="Tractor" lazy>

                <tractor />
            </b-tab>
        </b-tabs>
    </b-card-body>
</b-card>
</template>

<script>
import {
    BTab,
    BRow,
    BCol,
    BTabs,
    BCard,
    BCardBody,
    BFormGroup,
    BCardHeader,
    BAlert,
} from 'bootstrap-vue'
import axios from 'axios'
import vSelect from 'vue-select'
import {
    serverUri
} from '@/config'
import Driver from './Driver.vue'
import Tractor from './Tractor.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
    getUserData
} from "@/auth/utils";

import {
    mapActions
} from 'vuex'

export default {
    components: {
        BRow,
        BCol,
        BTab,
        BCard,
        BTabs,
        BAlert,
        BCardBody,
        BFormGroup,
        BCardHeader,
        ToastificationContent,
        Driver,
        Tractor,
        vSelect
    },
    data() {
        return {
            domiciles: [],
            selectedDomicile: {
                title: ''
            },
            selectedYear: null,
            selectedWeek: null,
            years: [],
            weeks: [],
        }
    },
    mounted() {
        const date = new Date();
        const currentYear = date.getFullYear();

        this.selectedYear = currentYear;

        for (let i = currentYear - 3; i <= currentYear; i++) {
            this.years.push(i);
        }

        for (let i = 1; i <= 52; i++) {
            this.weeks.push(i);
        }

        const startDate = new Date(date.getFullYear(), 0, 1);
        var days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));

        this.selectedWeek = Math.ceil(days / 7);

        this.addDataAction({
            year: this.selectedYear,
            week: this.selectedWeek,
            domicile: this.selectedDomicile.domicile
        })

        axios.post(`${serverUri}/schedule/getdomicile`, {
            company: getUserData().company_id
        }).then(res => {
            this.domiciles = res.data.filter(item => item.domicile?.length > 0)
        })
    },
    methods: {
        ...mapActions('schedule', ['addDataAction']),
        onChangeYear(year) {
            this.addDataAction({
                year: year,
                week: this.selectedWeek,
                domicile: this.selectedDomicile.domicile
            })
        },
        onChangeWeek(week) {
            this.addDataAction({
                year: this.selectedYear,
                week: week,
                domicile: this.selectedDomicile.domicile
            })
        },
        onChangeDomicile(domicile) {

            this.addDataAction({
                year: this.selectedYear,
                week: this.selectedWeek,
                domicile: domicile === null ? 'all' : domicile.domicile
            })
        },
    },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
