<template>
<b-sidebar id="add-new-user-sidebar" :visible="isAddNewUserSidebarActive" bg-variant="white" sidebar-class="sidebar-lg" shadow backdrop no-header right @hidden="resetForm" @change="(val) => $emit('update:is-add-new-user-sidebar-active', val)">
    <template #default="{ hide }">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
            <h5 class="mb-0">
                Add New User
            </h5>

            <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" @click="hide" />

        </div>

        <!-- BODY -->
        <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
            <!-- Form -->
            <b-form class="p-2" @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="resetForm">

                <!-- Full Name -->
                <validation-provider #default="validationContext" name="full-name" rules="required">
                    <b-form-group label="Full Name" label-for="full-name">
                        <b-form-input id="full-name" v-model="userData.fullName" autofocus :state="getValidationState(validationContext)" trim placeholder="John Doe" />

                        <b-form-invalid-feedback>
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>

                <!-- Email -->
                <validation-provider #default="validationContext" name="email" rules="required|email">
                    <b-form-group label="Email" label-for="email">
                        <b-form-input id="email" v-model="userData.email" :state="getValidationState(validationContext)" trim />

                        <b-form-invalid-feedback>
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>

                <!-- Password -->
                <!-- <validation-provider #default="validationContext" name="password" rules="required|password">
                    <b-form-group label="Password" label-for="password">
                        <b-form-input id="password" type="password" :state="getValidationState(validationContext)" v-model="userData.password" trim />
                        <b-form-invalid-feedback>
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider> -->

                <!-- Confirm Passowrd -->
                <!-- <validation-provider #default="validationContext" name="password2" rules="required|confirmed:password">
                    <b-form-group label="Confirm Password" label-for="password2">
                        <b-form-input id="password2" type="password" :state="getValidationState(validationContext)" v-model="userData.password2" trim />
                        <b-form-invalid-feedback>
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider> -->

                <!-- User Role -->
                <validation-provider #default="validationContext" name="role" rules="required">
                    <b-form-group label="User Role" label-for="role" :state="getValidationState(validationContext)">
                        <v-select v-model="userData.role" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="roleOptions" :reduce="val => val.value" :clearable="false" input-id="role" />
                        <b-form-invalid-feedback :state="getValidationState(validationContext)">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>

                <!-- User Permissions -->
                <!-- <validation-provider #default="validationContext" name="permission" rules="required">
                    <b-form-group label="User Permission" label-for="permission" :state="getValidationState(validationContext)">
                        <v-select v-model="userData.permission" multiple :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="permissionOptions" :reduce="val => val.value" :clearable="false" input-id="permission" />
                        <b-form-invalid-feedback :state="getValidationState(validationContext)">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider> -->

                <!-- Company -->
                <!-- <validation-provider #default="validationContext" name="company" rules="required">
                    <b-form-group label="Company" label-for="company" :state="getValidationState(validationContext)">
                        <v-select v-model="userData.company" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="planOptions" :reduce="val => val.value" :clearable="false" input-id="company" />
                        <b-form-invalid-feedback :state="getValidationState(validationContext)">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider> -->

                <!-- Form Actions -->
                <div class="d-flex mt-2">
                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit">
                        Add
                    </b-button>
                    <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="button" variant="outline-secondary" @click="hide">
                        Cancel
                    </b-button>
                </div>

            </b-form>
        </validation-observer>
    </template>
</b-sidebar>
</template>

<script>
import {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
} from 'bootstrap-vue'
import {
    ValidationProvider,
    ValidationObserver
} from 'vee-validate'
import {
    ref
} from '@vue/composition-api'
import {
    required,
    alphaNum,
    email
} from '@validations'
import axios from 'axios'
import { serverUri } from '@/config'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import countries from '@/@fake-db/data/other/countries'
import store from '@/store'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
    components: {
        BSidebar,
        BForm,
        BFormGroup,
        BFormInput,
        BFormInvalidFeedback,
        BButton,
        vSelect,

        // Form Validation
        ValidationProvider,
        ValidationObserver,
        ToastificationContent
    },
    directives: {
        Ripple,
    },
    model: {
        prop: 'isAddNewUserSidebarActive',
        event: 'update:is-add-new-user-sidebar-active',
    },
    props: {
        isAddNewUserSidebarActive: {
            type: Boolean,
            required: true,
        },
        roleOptions: {
            type: Array,
            required: true,
        },
        planOptions: {
            type: Array,
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
        onSubmit() {
            this.onInsertUser();

            this.showToast('success', 'Success', 'user has been added');
        }
    },
    data() {
        return {
            required,
            alphaNum,
            email,
            countries,
            permissionOptions: []
        }
    },
    created() {
        axios.get(`${serverUri}/users/getpermission`).then(res => {
            res.data.map(item => {
                this.permissionOptions.push({ label: item.action, value: item.action })
            })
        })
    },
    setup(props, {
        emit
    }) {
        const blankUserData = {
            fullName: '',
            username: '',
            email: '',
            role: '',
            permission: [],
            currentPlan: null,
            company: '',
            password: '',
            password2: ''
        }

        const userData = ref(JSON.parse(JSON.stringify(blankUserData)))

        const resetuserData = () => {
            userData.value = JSON.parse(JSON.stringify(blankUserData))
        }

        const onInsertUser = () => {
            store.dispatch('app-user/addUser', userData.value)
                .then(() => {
                    emit('refetch-data')
                    emit('update:is-add-new-user-sidebar-active', false)
                })
        }

        const {
            refFormObserver,
            getValidationState,
            resetForm,
        } = formValidation(resetuserData)

        return {
            userData,
            onInsertUser,

            refFormObserver,
            getValidationState,
            resetForm,
        }
    },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-user-sidebar {
    .vs__dropdown-menu {
        max-height: 200px !important;
    }
}
</style>
