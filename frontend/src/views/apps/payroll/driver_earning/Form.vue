<template lang="">
<b-card no-body>
    <b-card-header>
        <h3>Driver Payroll Report</h3>
    </b-card-header>
    <b-card-body>

        <b-card text-variant="center" class="card card-congratulations">
            <!-- images -->
            <b-img :src="require('@/assets/images/elements/decore-left.png')" class="congratulations-img-left" />
            <b-img :src="require('@/assets/images/elements/decore-right.png')" class="congratulations-img-right" />
            <!--/ images -->

            <b-avatar variant="primary" size="70" class="shadow mb-2">
                <feather-icon size="28" icon="AwardIcon" />
            </b-avatar>
            <h1 class="mb-1 mt-50 text-white">
                Driver Payroll Report,
            </h1>
            <b-card-text class="m-auto w-75">
                PaymentDate <strong>{{paymentDate}}</strong>, Date <strong>{{dateRange}}</strong>.
            </b-card-text>
        </b-card>

        <b-tabs align="right">
            <b-tab active title="Payroll Report">

                <b-table responsive="sm" :items="totalDataTable" :fields="totalFields" />

                <b-table responsive="sm" :items="detailDataTable" :fields="detailFields" />

            </b-tab>
            <b-tab title="Fixed Rates">
                <div>
                    <div>
                        <b-form ref="form" class="repeater-form" @submit.prevent="repeateAgain">

                            <!-- Row Loop -->
                            <b-row v-for="(item, index) in items" :id="item.id" :key="item.id" ref="row">

                                <!-- Item Name -->
                                <b-col md="3">
                                    <b-form-group label="From Miles" label-for="item-name">
                                        <b-form-input v-model="item.from_miles" id="item-name" type="number" placeholder="0" />
                                    </b-form-group>
                                </b-col>

                                <!-- Cost -->
                                <b-col md="3">
                                    <b-form-group label="To Miles" label-for="cost">
                                        <b-form-input v-model="item.to_miles" id="cost" type="number" placeholder="0" />
                                    </b-form-group>
                                </b-col>

                                <!-- Quantity -->
                                <b-col md="3">
                                    <b-form-group label="Fixed Rate" label-for="quantity">
                                        <b-form-input v-model="item.fixed_rate" id="quantity" type="number" placeholder="0" />
                                    </b-form-group>
                                </b-col>

                                <!-- Remove Button -->
                                <b-col md="3" class="mb-50">
                                    <b-button v-ripple.400="'rgba(234, 84, 85, 0.15)'" variant="outline-danger" class="mt-0 mt-md-2" @click="removeItem(index, item.id)">
                                        <feather-icon icon="XIcon" class="mr-25" />
                                        <span>Delete</span>
                                    </b-button>
                                </b-col>
                                <b-col md="12">
                                    <hr>
                                </b-col>
                            </b-row>

                        </b-form>
                    </div>
                    <b-button class="mr-2 mt-2" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="repeateAgain">
                        <feather-icon icon="PlusIcon" class="mr-25" />
                        <span>Add Fixed Rate</span>
                    </b-button>
                    <b-button class="mt-2" v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="onUpdateSetting" variant="outline-primary">
                        <feather-icon icon="ToolIcon" class="mr-25" />
                        <span>Update Setting</span>
                    </b-button>
                </div>
            </b-tab>
            <b-tab title="Price Per Mile">

                <b-form @submit.prevent>
                    <b-row>
                        <b-col cols="12">
                            <b-form-group label="Driver ID:" label-for="h-first-name" label-cols-md="4">
                                <b-form-input v-model="totalDataTable[0].driver_id" type="number" placeholder="Driver ID..." />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Driver Name:" label-for="h-email" label-cols-md="4">
                                <b-form-input v-model="totalDataTable[0].driver_name" type="text" placeholder="Jone Doe" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Price Per Mile:" label-for="h-number" label-cols-md="4">
                                <!-- <b-form-input v-model="totalDataTable[0].price_per_mile" type="number" placeholder="0.00" /> -->
                                <b-input-group
                                    prepend="$"
                                    append=".00"
                                >
                                    <b-form-input type="number" v-model="totalDataTable[0].price_per_mile" placeholder="100" />
                                </b-input-group>
                            </b-form-group>
                        </b-col>

                        <!-- submit and reset -->
                        <b-col offset-md="4">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="onUpdateFR" type="submit" variant="primary" class="mr-1">
                                Update Rate
                            </b-button>
                        </b-col>
                    </b-row>

                </b-form>
            </b-tab>
        </b-tabs>
    </b-card-body>
</b-card>
</template>

<script>
import {
    BCard,
    BCardBody,
    BCardHeader,
    BAlert,
    BTable,
    BImg,
    BAvatar,
    BCardText,
    BTabs,
    BTab,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend, 
    BInputGroupAppend,
    BRow,
    BCol,
    BButton,
} from 'bootstrap-vue'
import axios from 'axios'
import router from '@/router'
import {
    serverUri
} from '@/config'
import {
    heightTransition
} from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { getUserData } from "@/auth/utils";

export default {
    components: {
        BCard,
        BTabs,
        BTab,
        BCardBody,
        BCardHeader,
        BAlert,
        BTable,
        BAvatar,
        BImg,
        BCardText,
        BForm,
        BFormGroup,
        BFormInput,
        BRow,
        BCol,
        BButton,
        BInputGroup,
        BInputGroupPrepend, 
        BInputGroupAppend,
        ToastificationContent,
    },
    data() {
        return {
            isClicked: true,
            paymentDate: null,
            dateRange: null,
            items: [],
            nextTodoId: 2,
            totalDataTable: [
                {
                    driver_id: null ,
                    driver_name: null ,
                    fixed_rate_trips: 0 ,
                    fixed_rate_earning: 0 ,
                    miles_driven: 0 ,
                    price_per_mile: 0 ,
                    total: 0 
                },
            ],
            detailDataTable: [],
            totalFields: [
                { key: 'driver_id', label: 'DRIVER ID', },
                { key: 'driver_name', label: 'DRIVER NAME', },
                { key: 'fixed_rate_trips', label: '# OF TRIPS', },
                { key: 'fixed_rate_earning', label: 'METRO $', },
                { key: 'miles_driven', label: 'MILES DRIVEN', },
                { key: 'price_per_mile', label: '$/MILE', },
                { key: 'total', label: 'TOTAL' },
            ],
            detailFields: [
                { key: 'date', label: 'DATE', sortable: true },
                { key: 'origin', label: 'ORIGIN', sortable: true },
                { key: 'destination', label: 'DESTINATION', sortable: true },
                { key: 'miles', label: 'MILES', sortable: true },
                { key: 'pay_rate', label: 'PAY RATE', sortable: true },
                { key: 'payroll_value', label: 'PAYROLL VALUE', sortable: true },
            ],
        }
    },
    directives: {
        Ripple,
    },
    mixins: [heightTransition],
    created() {
        this.dateRange = router.currentRoute.params.dateRange;
        this.paymentDate = router.currentRoute.params.paymentDate;

        if (this.dateRange && this.paymentDate) {

            this.onLoadTable();
    
            window.addEventListener('resize', this.initTrHeight);
        }

    },
    destroyed() {
        window.removeEventListener('resize', this.initTrHeight)
    },
    methods: {
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
        repeateAgain() {
            this.items.push({
                id: this.items[this.items.length - 1].id + 1,
            })
        },
        removeItem(index, id) {
            

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
                    this.items.splice(index, 1)
                    
                    axios.delete(`${serverUri}/api/payroll/deletefr/${id}`).then(res => {
                        this.showToast('success', 'Success', 'The fixed rate has been deleted.')
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

            
        },
        onUpdateFR() {
            axios.post(`${serverUri}/api/payroll/updatefr`, { driver_id: this.totalDataTable[0].driver_id, driver_name: this.totalDataTable[0].driver_name, price_per_mile: this.totalDataTable[0].price_per_mile }).then(res => {
                if (res.data.affectedRows) {
                    this.showToast('success', 'Success', 'The price per mile has been updated.')

                    this.onLoadTable();
                } else {
                    this.showToast('danger', 'failure', 'Could not find the driver.')
                }
            })
        },
        onUpdateSetting() {
            axios.post(`${serverUri}/api/payroll/updatesetting/${router.currentRoute.params.company}`, this.items).then(res => {
                this.showToast('success', 'Success', 'The fixed rate has been updated.')

                this.onLoadTable();
            })
        },
        onLoadTable() {
            this.dateRange = router.currentRoute.params.dateRange;
            this.paymentDate = router.currentRoute.params.paymentDate;

            let startDate = null;
            let endDate = null;
    
            if (this.dateRange.split('to').length) {
                startDate = this.dateRange.split('to')[0];
                endDate = this.dateRange.split('to')[1];
            } else {
                startDate = this.dateRange.split('to');
            }

            const userData = getUserData();
    
            axios.post(`${serverUri}/api/payroll/getpayroll/${router.currentRoute.params.id}`, { company: router.currentRoute.params.company, startDate: startDate, endDate: endDate }).then(res => {
                // calculate total data
                res.data.driverData.map(item1 => {
                    if (!this.totalDataTable.driver_id || !this.totalDataTable.driver_name) {
                        this.totalDataTable[0].driver_id = item1.driver_id;
                        this.totalDataTable[0].driver_name = item1.driver_name;
                    }
                    
                    const filtering = res.data.rateSetting.filter(item2 => item1.miles_qty >= item2.from_miles && item1.miles_qty <= item2.to_miles)
                    if (filtering.length) {
                        this.totalDataTable[0].fixed_rate_trips += item1.miles_qty;
                        this.totalDataTable[0].fixed_rate_earning += filtering[0].fixed_rate;
                    } else {
                        this.totalDataTable[0].miles_driven += item1.miles_qty;
                        this.totalDataTable[0].price_per_mile = item1.price_per_mile;
                    }
    
                    this.detailDataTable.push(
                        {
                            date: new Date(item1.date).toLocaleDateString() ,
                            origin: item1.leg_org ,
                            destination: item1.leg_dest ,
                            miles: item1.miles_qty ,
                            pay_rate: filtering.length ? `$${filtering[0].fixed_rate}` : item1.price_per_mile ,
                            payroll_value: filtering.length ?  `$${filtering[0].fixed_rate}` : item1.price_per_mile*item1.miles_qty ,
                        }
                    );
                })
    
                this.totalDataTable[0].total = this.totalDataTable[0].fixed_rate_earning + this.totalDataTable[0].price_per_mile;
    
                this.items = res.data.rateSetting;
            });
        }
    },
};
</script>

<style lang="scss" scoped>
.repeater-form {
    overflow: hidden;
    transition: .35s height;
}
</style>
