<template>
<div>

    <!-- Media -->
    <b-media class="mb-2 edit-header">
        <template #aside>
            <b-avatar ref="previewEl" :src="userData.avatar" :text="avatarText(userData.fullName)" :variant="`light-${resolveUserRoleVariant(userData.role)}`" size="90px" rounded />
        </template>
        <h4 class="mb-1">
            {{ userData.fullName }}
        </h4>
        <div class="d-flex flex-wrap">
        <b-button
          variant="primary"
          @click="$refs.refInputEl.click()"
        >
          <input
            ref="refInputEl"
            type="file"
            class="d-none"
            @input="inputImageRenderer"
          >
          <span class="d-none d-sm-inline">Update</span>
          <feather-icon
            icon="EditIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
          variant="outline-secondary"
          class="ml-1"
        >
          <span class="d-none d-sm-inline">Remove</span>
          <feather-icon
            icon="TrashIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
      </div>
    </b-media>

    <!-- User Info: Input Fields -->
    <validation-observer ref="simpleRules">
        <b-form @submit.prevent="onUpdate" @reset.prevent="resetForm">
            <b-row>

                <!-- Field: Full Name -->
                <b-col cols="12" md="4">
                    <b-form-group label="Name" label-for="full-name">
                        <validation-provider #default="{ errors }" name="Name" rules="required">
                            <b-form-input v-model="userData.fullName" :state="errors.length > 0 ? false:null" placeholder="Your Name" />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </b-col>

                <!-- Field: Email -->
                <b-col cols="12" md="4">
                    <b-form-group label="Email" label-for="email">
                        <validation-provider #default="{ errors }" name="Email" rules="required|email">
                            <b-form-input v-model="userData.email" :state="errors.length > 0 ? false:null" type="email" placeholder="Your Email" />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </b-col>

                <!-- Field: Status -->
                <b-col cols="12" md="4">
                    <b-form-group label="Status" label-for="user-status">
                        <v-select v-model="userData.status" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="statusOptions" :reduce="val => val.value" :clearable="false" input-id="user-status" />
                    </b-form-group>
                </b-col>

                <!-- Field: Role -->
                <b-col cols="12" md="4">
                    <b-form-group label="User Role" label-for="user-role">
                        <v-select v-model="userData.role" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="roleOptions" :reduce="val => val.value" :clearable="false" input-id="user-role" />
                    </b-form-group>
                </b-col>

                <!-- Field: Email -->
                <b-col cols="12" md="4">
                    <b-form-group label="Company" label-for="company">
                        <v-select v-model="userData.company" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="companiesList" :reduce="val => val.value" :clearable="false" input-id="company" />
                    </b-form-group>
                </b-col>

                <b-col cols="6">
                    <b-form-group label="Password" label-for="a-password">
                        <validation-provider #default="{ errors }" name="Password" vid="Password" rules="required|min:8|password">
                            <b-form-input id="a-password" v-model="userData.password" :state="errors.length > 0 ? false:null" type="password" placeholder="Password" />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </b-col>

                <!-- confirm password -->
                <b-col cols="6">
                    <b-form-group label="Confirm Password" label-for="ac-password">
                        <validation-provider #default="{ errors }" name="Confirm Password" rules="required|confirmed:Password">

                            <b-form-input id="ac-password" v-model="userData.password2" :state="errors.length > 0 ? false:null" type="password" placeholder="Confirm Password" />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </b-col>

                <b-col cols="12" md="12">
                    <b-row class="permission">
                        <b-col sm="3" v-for="option in options" :key="option.value">
                            <b-form-checkbox v-model="selected" @change="onCheckPermission(selected)" :value="option.value" name="flavour-3a">
                                {{ option.text }}
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <!-- Action Buttons -->
            <b-button type="submit" :block="$store.getters['app/currentBreakPoint'] === 'xs'" variant="primary" class="mb-1 mb-sm-0 mr-0 mr-sm-1">
                Save Changes
            </b-button>
            <b-button variant="outline-secondary" type="submit" @click.prevent="validationForm" :block="$store.getters['app/currentBreakPoint'] === 'xs'">
                Reset
            </b-button>
        </b-form>
    </validation-observer>
</div>
</template>

<script>
import {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    BFormCheckboxGroup
} from 'bootstrap-vue'
import {
    avatarText
} from '@core/utils/filter'
import vSelect from 'vue-select'
import {
    useInputImageRenderer
} from '@core/comp-functions/forms/form-utils'
import {
    ref
} from '@vue/composition-api'
import useUsersList from '../users-list/useUsersList'
import { getUserData } from "@/auth/utils";
import {
    required,
    min,
    confirmed,
} from '@validations'
import {
    ValidationProvider,
    ValidationObserver
} from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'
import store from '@/store'
import {
    serverUri
} from '@/config'

export default {
    components: {
        BButton,
        BMedia,
        BAvatar,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BForm,
        BTable,
        BCard,
        BCardHeader,
        BCardTitle,
        BFormCheckbox,
        BFormCheckboxGroup,
        ValidationProvider,
        ValidationObserver,
        vSelect,
        ToastificationContent
    },
    data() {
        return {
            password: '',
            password2: '',
            roleOptions: [],
            companiesList: [],
            selected: [],
            options: [],
            checked: [],
            required,
            min,
            confirmed,
        }
    },
    props: {
        userData: {
            type: Object,
            required: true,
        },
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
        validationForm() {
            this.$refs.simpleRules.validate().then(success => {
                if (success) {
                    // eslint-disable-next-line
                    alert('password reset!')
                }
            })
        },
        onUpdate() {
            axios.post(`${serverUri}/users/userpermission`, { permission: this.checked, id: this.userData.id }).then(res => {
                this.onUpdateUser();
                this.showToast('success', 'Success', 'The user data has been updated')

                this.$router.push({ name: 'apps-users-list' });
            })
        },
        onCheckPermission(data) {
            this.checked = data;
        }
    },
    created() {

        axios.get(`${serverUri}/users/getrole`).then(res => {
            res.data.map(item => {
                this.roleOptions.push({
                    label: item.name,
                    value: item.name
                })
            })
        })

        axios.get(`${serverUri}/users/getcompany`).then(res => {
            res.data.map(item => {
                this.companiesList.push({ label: item.name, value: item.name, id: item.id })
            })
        })

        axios.get(`${serverUri}/users/getpermission`).then(res => {
            res.data.map(item => {
                this.options.push({ value: item.action, text: item.action.split('manage-')[1] })
            })
        })
    },
    setup(props) {
        const {
            resolveUserRoleVariant,
            refreshData
        } = useUsersList()

        // let roleOptions = [];

        const statusOptions = [{
                label: 'Pending',
                value: 'pending'
            },
            {
                label: 'Active',
                value: 'active'
            },
            {
                label: 'Inactive',
                value: 'inactive'
            },
        ]

        // ? Demo Purpose => Update image on click of update
        const refInputEl = ref(null)
        const previewEl = ref(null)

        const onUpdateUser = () => {
            store.dispatch('app-user/updateUser', props.userData)
                .then(() => {
                    // eslint-disable-next-line no-use-before-define
                    refreshData()
                })
        }

        const {
            inputImageRenderer
        } = useInputImageRenderer(refInputEl, base64 => {
            // eslint-disable-next-line no-param-reassign
            props.userData.avatar = base64
        })

        return {
            resolveUserRoleVariant,
            refreshData,
            onUpdateUser,
            avatarText,
            // roleOptions,
            statusOptions,

            //  ? Demo - Update Image on click of update button
            refInputEl,
            previewEl,
            inputImageRenderer,
        }
    },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.edit-header {
    display: flex;
    align-items: center;
}
</style><style>
.permission {
    margin: 10px 0;
}

.permission div {
    margin: 2px 0;
}
</style>
