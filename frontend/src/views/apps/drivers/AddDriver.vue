<template>
<div class="driver-insert">
    <b-media class="mb-2 ml-2">
        <template #aside>
            <b-avatar ref="previewEl" :src="avatar ? driver.photo = avatar : driver.photo" variant="light-primary" size="90px" rounded />
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

    <b-form-group label="Driver ID" label-for="basicInput">
        <b-form-input id="basicInput" v-model="driver.driver_id" placeholder="Enter driver ID.." />
    </b-form-group>

    <b-form-group label="Driver Name" label-for="basicInput">
        <b-form-input id="basicInput" v-model="driver.driver_name" placeholder="Enter driver name.." />
    </b-form-group>

    <b-form-group label="Email" label-for="basicInput">
        <b-form-input id="basicInput" v-model="driver.email" placeholder="Enter driver email.." />
    </b-form-group>

    <!-- with prop prepend  -->
    <b-input-group style="width: 93%" prepend="+">
        <b-form-input type="number" v-model="driver.phone" placeholder="Enter Phone number.." />
    </b-input-group>

    <b-form-group label="License" label-for="basicInput">
        <b-form-input id="basicInput" v-model="driver.license" placeholder="Enter driver license.." />
    </b-form-group>

    <b-form-group label="Address" label-for="basicInput">
        <b-form-input id="basicInput" v-model="driver.address" placeholder="Enter driver address.." />
    </b-form-group>

    <b-form-group label="Domicile" label-for="basicInput">
        <b-form-input id="basicInput" v-model="driver.domicile" placeholder="Enter driver domicile.." />
    </b-form-group>

    <!-- with prop prepend  -->
    <b-input-group style="width: 93%" prepend="$">
        <b-form-input type="number" v-model="driver.price_per_mile" placeholder="Enter price per mile.." />
    </b-input-group>

    <b-form-group>
        <v-select v-model="driver.work_status" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="option" />
    </b-form-group>

    <b-button @click="onSaveDriver" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">
        Save
    </b-button>

</div>
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
    BButton,
    BAvatar,
    BListGroup,
    BListGroupItem,
    BCardText,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BMedia,
    BInputGroupPrepend,
} from 'bootstrap-vue'
import axios from 'axios'
import {
    serverUri
} from '@/config'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import {
    ref
} from '@vue/composition-api'
import {
    getUserData
} from '@/auth/utils'
import {
    mapState,
    mapActions
} from 'vuex'
import {
    useInputImageRenderer
} from '@core/comp-functions/forms/form-utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
    components: {
        XlsxRead,
        XlsxTable,
        XlsxSheets,
        XlsxJson,
        XlsxWorkbook,
        XlsxSheet,
        XlsxDownload,
        BMedia,
        BButton,
        BAvatar,
        BListGroup,
        BListGroupItem,
        BCardText,
        BFormGroup,
        BFormInput,
        BInputGroup,
        BInputGroupPrepend,
        vSelect,
    },
    data() {
        return {
            sidebarItems: [{
                    title: 'Dashboard',
                    icon: 'GridIcon'
                },
                {
                    title: 'Analytics',
                    icon: 'ActivityIcon'
                },
                {
                    title: 'History',
                    icon: 'RefreshCwIcon'
                },
                {
                    title: 'Configuration',
                    icon: 'SettingsIcon'
                },
                {
                    title: 'Profile',
                    icon: 'UserIcon'
                },
            ],
            option: [{
                title: 'Working',
                value: 1
            }, {
                title: 'No longer working',
                value: 0
            }],
            selectedImage: null,
            filter_status: null,
        }
    },
    directives: {
        Ripple,
    },
    computed: {
        ...mapState({
            driver: state => state.driversStore.driversEdit,
            driversList: state => state.driversStore.driversList
        }),

    },
    methods: {
        ...mapActions('driversStore', ['addDriverAction', 'editDriverAction', 'updateDriverAction']),
        onSaveDriver() {
            if (this.driver.id) {
                axios.post(`${serverUri}/drivers/updatedriver/${this.driver.id}`, {
                    ...this.driver
                }).then(res => {
                    this.showToast('success', 'Success', `The driver ${this.driver.driver_name} has been updated`);
                });
            } else {
                const userData = getUserData();

                axios.post(`${serverUri}/drivers/savedriver`, {
                    ...this.driver,
                    company_id: userData.company_id
                }).then(res => {

                    if (res.data.length) this.addDriverAction(res.data.map(item => {
                        if(item.work_status === this.filter_status.value)
                            return item;
                        }));

                    this.showToast('success', 'Success', `The driver ${this.driver.driver_name} has been added`);
                });
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
    props: {
        avatar: {
            type: String,
        },
    },
    created() {
        this.filter_status = this.driver.work_status
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

<style scoped>
.driver-insert .form-group,
.input-group,
button {
    margin: 15px 15px;
}
</style><style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
