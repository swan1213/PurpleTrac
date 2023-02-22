<template>
<div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

        <!-- Brand logo-->
        <b-link class="brand-logo">
            <!-- <vuexy-logo /> -->
            <img :src="logo" style="height: 45px; width: 37px" />
            <div>

                <h2 class="brand-text text-primary ml-1" style="color: rgb(77, 20, 140);">
                    purpletrac
                    <p style="font-size: 8px; letter-spacing: 0.9px; line-height: 10px;">TRACKING BUSINESS METRICS</p>
                </h2>
            </div>
        </b-link>
        <!-- /Brand logo-->

        <!-- Register-->
        <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
            <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
                <b-card-title class="mb-1 font-weight-bold" title-tag="h2">
                    Welcome to Purpletrac!
                </b-card-title>
                <b-card-text class="mb-2">
                    Please enter a new password below
                </b-card-text>

                <!-- form -->
                <validation-observer ref="registerForm" #default="{invalid}">
                    <b-form class="auth-register-form mt-2" @submit.prevent="register">
                        <!-- username -->
                        <!-- <b-form-group label="Username" label-for="register-username">
                            <validation-provider #default="{ errors }" name="Username" vid="username" rules="required">
                                <b-form-input id="register-username" v-model="username" name="register-username" :state="errors.length > 0 ? false:null" placeholder="johndoe" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group> -->

                        <!-- email -->
                        <b-form-group label="Email" label-for="register-email">
                            <validation-provider #default="{ errors }" name="Email" vid="email" rules="required|email">
                                <b-form-input id="register-email" v-model="userEmail" name="register-email" :state="errors.length > 0 ? false:null" placeholder="john@example.com" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>

                        <!-- password -->
                        <b-form-group label-for="register-currentpassword" label="Password">
                            <validation-provider #default="{ errors }" name="Password" vid="password" rules="required">
                                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
                                    <b-form-input id="register-currentpassword" v-model="currentpassword" class="form-control-merge" :type="passwordFieldType3" :state="errors.length > 0 ? false:null" name="register-currentpassword" placeholder="············" />
                                    <b-input-group-append is-text>
                                        <feather-icon :icon="passwordToggleIcon3" class="cursor-pointer" @click="togglePasswordVisibility3" />
                                    </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>

                        <!-- password -->
                        <b-form-group label-for="register-password" label="Password">
                            <validation-provider #default="{ errors }" name="Password" vid="password" rules="required">
                                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
                                    <b-form-input id="register-password" v-model="password" class="form-control-merge" :type="passwordFieldType" :state="errors.length > 0 ? false:null" name="register-password" placeholder="············" />
                                    <b-input-group-append is-text>
                                        <feather-icon :icon="passwordToggleIcon" class="cursor-pointer" @click="togglePasswordVisibility" />
                                    </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>

                        <!-- password -->
                        <b-form-group label-for="register-password2" label="Password Confirm">
                            <validation-provider #default="{ errors }" name="Password Confirm" vid="password2" rules="required|confirmed:password">
                                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
                                    <b-form-input id="register-password2" v-model="password2" class="form-control-merge" :type="passwordFieldType2" :state="errors.length > 0 ? false:null" name="register-password2" placeholder="············" />
                                    <b-input-group-append is-text>
                                        <feather-icon :icon="passwordToggleIcon2" class="cursor-pointer" @click="togglePasswordVisibility2" />
                                    </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>

                        <b-button variant="primary" block type="submit" :disabled="invalid">
                            Reset
                        </b-button>
                    </b-form>
                </validation-observer>

                <p class="text-center mt-2">
                    <span>Already reset password?</span>
                    <b-link :to="{name:'auth-login'}">
                        <span>&nbsp;Sign in instead</span>
                    </b-link>
                </p>
            </b-col>
        </b-col>
        <!-- /Register-->

        <!-- Left Text-->
        <b-col lg="8" style="padding:0px;">
            <div class="login-image" style="height: 100%; display: flex; justify-content: center; align-items: center;">
                <img :src="verticalLogo" style="padding: 150px 200px" />
            </div>
        </b-col>
        <!-- /Left Text-->
    </b-row>
</div>
</template>

<script>
/* eslint-disable global-require */
import {
    ValidationProvider,
    ValidationObserver
} from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import Logo from '@/assets/images/logo/favicon.png'
import VerticalLogo from '@/assets/images/logo/vertical-logo-wholewhite.svg'
import {
    BRow,
    BCol,
    BLink,
    BButton,
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BImg,
    BCardTitle,
    BCardText,
} from 'bootstrap-vue'
import {
    required,
    email
} from '@validations'
import {
    togglePasswordVisibility
} from '@core/mixins/ui/forms'
import store from '@/store/index'
import useJwt from '@/auth/jwt/useJwt'

import axios from 'axios'
import {
    serverUri
} from '@/config'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
    components: {
        VuexyLogo,
        BRow,
        BImg,
        BCol,
        BLink,
        BButton,
        BForm,
        BCardText,
        BCardTitle,
        BFormCheckbox,
        BFormGroup,
        BFormInput,
        BInputGroup,
        BInputGroupAppend,
        // validations
        ValidationProvider,
        ValidationObserver,
        Logo,
    },
    mixins: [togglePasswordVisibility],
    data() {
        return {
            status: '',
            username: '',
            userEmail: '',
            password: '',
            password2: '',
            currentpassword: '',
            sideImg: require('@/assets/images/pages/register-v2.svg'),
            // validation
            required,
            email,
            logo: Logo,
            verticalLogo: VerticalLogo,
        }
    },
    computed: {
        passwordToggleIcon() {
            return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
        },
        passwordToggleIcon2() {
            return this.passwordFieldType2 === 'password' ? 'EyeIcon' : 'EyeOffIcon'
        },
        passwordToggleIcon3() {
            return this.passwordFieldType3 === 'password' ? 'EyeIcon' : 'EyeOffIcon'
        },
        imgUrl() {
            if (store.state.appConfig.layout.skin === 'dark') {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.sideImg = require('@/assets/images/pages/register-v2-dark.svg')
                return this.sideImg
            }
            return this.sideImg
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
        register() {
            
            axios.post(`${serverUri}/resetpassword`, { email: this.userEmail, password: this.password, currentpassword: this.currentpassword }).then(res => {
                if (res.data.message === 'wrong') {
                    this.showToast('danger', 'Failure', 'Current password is wrong')
                } else {
                        
                        if (res.data.affectedRows) {
                            this.showToast('success', 'Success', 'The password has been reset')
                        } else {
                            this.showToast('warning', 'Warning', 'The user does not exist')
                        }
                }
            });

            // this.$refs.registerForm.validate().then(success => {
            //     if (success) {

            //         axios.post(`${serverUri}/register`, {
            //             name: this.username,
            //             email: this.userEmail,
            //             password: this.password
            //         }).then(res => {
            //             if (!res.data.status) {

            //                 this.showToast('warning', 'Warning', res.data.msg)
            //             } else {

            //                 this.showToast('success', 'Success', 'The user has been registered')

            //                 this.$router.push({ name: 'auth-login' })

            //                 useJwt.register({
            //                         username: this.username,
            //                         email: this.userEmail,
            //                         password: this.password,
            //                     })
            //                     .then(response => {
            //                         useJwt.setToken(response.data.accessToken)
            //                         useJwt.setRefreshToken(response.data.refreshToken)
            //                         // localStorage.setItem('userData', JSON.stringify(response.data.userData))
            //                         // this.$ability.update(response.data.userData.ability)
            //                         // this.$router.push('/login')
            //                     })
            //                     .catch(error => {
            //                         this.$refs.registerForm.setErrors(error.response.data.error)
            //                     })
            //             }
            //         })
            //     }
            // })
        },
    },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style><style>
.login-image {
    background-image: url('../../../assets/images/pages/login-v2.png');
    background: linear-gradient(0, 0, 0, 0.3);
}
</style>
