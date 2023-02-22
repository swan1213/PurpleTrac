<template lang="">
<b-card no-body>
    <b-card-header>
        <h3>Driver Payroll Report</h3>
    </b-card-header>
    <b-card-body>
        <b-tabs align="center">
            <b-tab class="flex" active title="Payroll Report">
                <b-row>
                    <b-col md="3" />
                    <b-col md="6">
                    
                        <b-card class="card-transaction" border-variant="info" no-body>
                            <b-card-header>
                                <b-card-title>PAYROLL FOR DRIVER</b-card-title>
                                <!-- <feather-icon icon="MoreVerticalIcon" size="18" class="cursor-pointer" /> -->
                            </b-card-header>

                            <b-card-body>
                                <div v-for="transaction in transactionData" :key="transaction.key" class="transaction-item">
                                    <b-media no-body>
                                        <b-media-aside>
                                            <b-avatar rounded size="42" :variant="transaction.avatarVariant">
                                                <feather-icon size="18" :icon="transaction.avatar" />
                                            </b-avatar>
                                        </b-media-aside>
                                        <b-media-body>
                                            <h6 class="transaction-title">
                                                {{ transaction.label }}
                                            </h6>
                                        </b-media-body>
                                    </b-media>
                                    <div class="font-weight-bolder" :class="transaction.deduction">
                                        {{ transaction.key === 'price_for_fr' || transaction.key === 'price_per_mile' || transaction.key === 'price_excl_fr' || transaction.key === 'total_price' ? '$' + payroll[transaction.key] : payroll[transaction.key] }}
                                    </div>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-col>
                    <b-col md="3" />
                </b-row>


            </b-tab>

            <b-tab title="Fixed Rates">
                <div>
                    <div>
                        <b-form ref="form" class="repeater-form" @submit.prevent="repeateAgain">

                            <!-- Row Loop -->
                            <b-row v-for="(item, index) in fixed_rate" :id="item.id" :key="item.id" ref="row">

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
                                <b-form-input v-model="payroll.driver_id" type="number" placeholder="Driver ID..." />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Driver Name:" label-for="h-email" label-cols-md="4">
                                <b-form-input v-model="payroll.name" type="text" placeholder="Jone Doe" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Price Per Mile:" label-for="h-number" label-cols-md="4">
                                <!-- <b-form-input v-model="totalDataTable[0].price_per_mile" type="number" placeholder="0.00" /> -->
                                <b-input-group prepend="$" append=".00">
                                    <b-form-input type="number" v-model="payroll.price_per_mile" placeholder="100" />
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
    BCardTitle,
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
    BMediaBody,
    BMedia,
    BMediaAside,
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
import {
    mapState
} from 'vuex'
import {
    getUserData
} from "@/auth/utils";
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
    components: {
        BCard,
        BTabs,
        BTab,
        BCardTitle,
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
        BMediaBody,
        BMedia,
        BMediaAside,
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
            transactionData: [{
                    key: 'year',
                    label: 'Year',
                    avatar: 'CalendarIcon',
                    avatarVariant: 'light-primary',
                    deduction: 'text-info',
                },
                {
                    key: 'week',
                    label: 'Week',
                    avatar: 'CalendarIcon',
                    avatarVariant: 'light-primary',
                    deduction: 'text-info',
                },
                {
                    key: 'driver_id',
                    label: 'Driver ID',
                    avatar: 'TruckIcon',
                    avatarVariant: 'light-success',
                    deduction: 'text-info',
                },
                {
                    key: 'name',
                    label: 'Driver Name',
                    avatar: 'UserIcon',
                    avatarVariant: 'light-success',
                    deduction: 'text-info',
                },
                // {
                //     key: 'status',
                //     label: 'Work Status',
                //     avatar: 'ActivityIcon',
                //     avatarVariant: 'light-success',
                //     deduction: 'text-info',
                // },
                {
                    key: 'mi_for_fr',
                    label: 'Miles For Fixed Rate',
                    avatar: 'DollarSignIcon',
                    avatarVariant: 'light-danger',
                    deduction: 'text-success',
                },
                {
                    key: 'price_for_fr',
                    label: 'Price For Fixed Rate',
                    avatar: 'DollarSignIcon',
                    avatarVariant: 'light-danger',
                    deduction: 'text-success',
                },
                {
                    key: 'price_per_mile',
                    label: 'Price Per Mile',
                    avatar: 'DollarSignIcon',
                    avatarVariant: 'light-danger',
                    deduction: 'text-primary',
                },
                {
                    key: 'mi_excl_fr',
                    label: 'Miles For Price Per Mile',
                    avatar: 'DollarSignIcon',
                    avatarVariant: 'light-danger',
                    deduction: 'text-warning',
                },
                {
                    key: 'price_excl_fr',
                    label: 'Price For Price Per Mile',
                    avatar: 'DollarSignIcon',
                    avatarVariant: 'light-danger',
                    deduction: 'text-warning',
                },
                {
                    key: 'total_miles',
                    label: 'Total Miles',
                    avatar: 'CreditCardIcon',
                    avatarVariant: 'light-warning',
                    deduction: 'text-danger',
                },
                {
                    key: 'total_price',
                    label: 'Total Payroll',
                    avatar: 'TrendingUpIcon',
                    avatarVariant: 'light-info',
                    deduction: 'text-danger',
                },
            ],
        }
    },
    directives: {
        Ripple,
    },
    mixins: [heightTransition],
    created() {
        window.addEventListener('resize', this.initTrHeight);
    },
    computed: {
        ...mapState({
            payroll: state => state.payrollStore.payroll,
            fixed_rate: state => state.payrollStore.fixed_rate,
        })
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
            this.fixed_rate.push({
                id: this.fixed_rate[this.fixed_rate.length - 1].id + 1,
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
                    this.fixed_rate.splice(index, 1)

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
            axios.post(`${serverUri}/api/payroll/updatefr`, {
                driver_id: this.payroll.driver_id,
                driver_name: this.payroll.name,
                price_per_mile: this.payroll.price_per_mile
            }).then(res => {
                if (res.data.affectedRows) {
                    this.showToast('success', 'Success', 'The price per mile has been updated.')
                } else {
                    this.showToast('danger', 'failure', 'Could not find the driver.')
                }
            })
        },
        onUpdateSetting() {
            const company = getUserData().company_id;

            axios.post(`${serverUri}/api/payroll/updatesetting/${company}`, this.fixed_rate).then(res => {
                this.showToast('success', 'Success', 'The fixed rate has been updated.')
            })
        },
    },
};
</script>

<style lang="scss" scoped>
.repeater-form {
    overflow: hidden;
    transition: .35s height;
}
</style>