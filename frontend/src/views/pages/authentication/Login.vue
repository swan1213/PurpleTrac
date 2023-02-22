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

        <!-- Login-->
        <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
            <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
                <b-card-title class="mb-1 font-weight-bold" title-tag="h2">
                    Welcome to Purpletrac!
                </b-card-title>
                <!-- <b-card-text class="mb-2">
                    Please sign-in to your account and start the administration
                </b-card-text> -->

                <!-- form -->
                <validation-observer ref="loginForm" #default="{invalid}">
                    <b-form class="auth-login-form mt-2" @submit.prevent="login">
                        <!-- email -->
                        <b-form-group label="Email" label-for="login-email">
                            <validation-provider #default="{ errors }" name="Email" vid="email" rules="required|email">
                                <b-form-input id="login-email" v-model="userEmail" :state="errors.length > 0 ? false:null" name="login-email" placeholder="john@example.com" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>

                        <!-- forgot password -->
                        <b-form-group>
                            <div class="d-flex justify-content-between">
                                <label for="login-password">Password</label>
                                <b-link :to="{name:'auth-register'}">
                                    <small>Sends email for reset</small>
                                </b-link>
                            </div>
                            <validation-provider #default="{ errors }" name="Password" vid="password" rules="required">
                                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
                                    <b-form-input id="login-password" v-model="password" :state="errors.length > 0 ? false:null" class="form-control-merge" :type="passwordFieldType" name="login-password" placeholder="Password" />
                                    <b-input-group-append is-text>
                                        <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility" />
                                    </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>

                        <!-- checkbox -->
                        <b-form-group>
                            <b-form-checkbox id="remember-me" v-model="status" name="checkbox-1">
                                Remember Me
                            </b-form-checkbox>
                        </b-form-group>

                        <!-- submit buttons -->
                        <b-button type="submit" variant="primary" block :disabled="invalid">
                            Sign in
                        </b-button>
                    </b-form>
                </validation-observer>

                <!-- <b-card-text class="text-center mt-2">
                    <span>New on our platform? </span>
                    <b-link :to="{name:'auth-register'}">
                        <span>&nbsp;Create an account</span>
                    </b-link>
                </b-card-text> -->

            </b-col>
        </b-col>
        <!-- /Login-->

        <!-- Left Text-->
        <b-col lg="8" style="padding:0px;">
            <div class="login-image" style="height: 100%; display: flex; justify-content: center; align-items: center;">
                <img src="@/assets/images/logo/vertical-logo-wholewhite.svg" style="padding: 150px 200px" />
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
import {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    VBTooltip,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import {
    required,
    email
} from '@validations'
import {
    togglePasswordVisibility
} from '@core/mixins/ui/forms'
import store from '@/store/index'
import {
    getHomeRouteForLoggedInUser
} from '@/auth/utils'
import axios from 'axios'
import {
    serverUri
} from '@/config'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
    directives: {
        'b-tooltip': VBTooltip,
    },
    components: {
        BRow,
        BCol,
        BLink,
        BFormGroup,
        BFormInput,
        BInputGroupAppend,
        BInputGroup,
        BFormCheckbox,
        BCardText,
        BCardTitle,
        BImg,
        BForm,
        BButton,
        BAlert,
        VuexyLogo,
        ValidationProvider,
        ValidationObserver,
        Logo
    },
    mixins: [togglePasswordVisibility],
    data() {
        return {
            status: '',
            password: '',
            userEmail: '',
            sideImg: require('@/assets/images/pages/login-v2.png'),

            // validation rules
            required,
            email,
            logo: Logo
        }
    },
    computed: {
        passwordToggleIcon() {
            return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
        },
        imgUrl() {
            if (store.state.appConfig.layout.skin === 'dark') {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.sideImg = require('@/assets/images/pages/login-v2.png')
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
        login() {
            this.$refs.loginForm.validate().then(success => {
                if (success) {

                    axios.post(`${serverUri}/login`, {
                        email: this.userEmail,
                        password: this.password
                    }).then(res => {
                        if (!res.data.status) {

                            this.showToast('warning', 'Warning', res.data.msg)
                        } else {

                            useJwt.login({
                                    email: this.userEmail,
                                    password: this.password,
                                })
                                .then(response => {
                                    const {
                                        userData
                                    } = response.data
                                    useJwt.setToken(response.data.accessToken)
                                    useJwt.setRefreshToken(response.data.refreshToken)
                                    localStorage.setItem('userData', JSON.stringify(userData))
                                    this.$ability.update(userData.ability)

                                    // ? This is just for demo purpose as well.
                                    // ? Because we are showing eCommerce app's cart items count in navbar
                                    this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', userData.extras.eCommerceCartItemsCount)

                                    // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
                                    this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
                                        .then(() => {
                                            this.$toast({
                                                component: ToastificationContent,
                                                position: 'top-right',
                                                props: {
                                                    title: `Welcome ${userData.fullName || userData.username}`,
                                                    icon: 'CoffeeIcon',
                                                    variant: 'success',
                                                    text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
                                                },
                                            })
                                        })
                                })
                                .catch(error => {
                                    this.$refs.loginForm.setErrors(error.response.data.error)
                                })
                        }
                    })
                }
            })
        },
    },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style><style>
.login-image {
    background-image: url('../../../assets/images/pages/login-v2.png');
    background: linear-gradient(0, 0, 0, 0.3);
}
</style>
