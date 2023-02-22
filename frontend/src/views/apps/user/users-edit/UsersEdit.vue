<template>
<component :is="userData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="userData === undefined">
        <h4 class="alert-heading">
            Error fetching user data
        </h4>
        <div class="alert-body">
            No user found with this user id. Check
            <b-link class="alert-link" :to="{ name: 'apps-users-list'}">
                User List
            </b-link>
            for other users.
        </div>
    </b-alert>

    <!-- <b-tabs v-if="userData" pills> -->

        <!-- Tab: Account -->
        <!-- <b-tab active>
            <template #title>
                <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
                <span v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-center class="d-none d-sm-inline">Create Permission</span>
            </template> -->
            <user-edit-tab-account :user-data="userData" class="mt-2 pt-75" />
        <!-- </b-tab>
    </b-tabs> -->

    <b-modal id="modal-center" centered title="Create Permission" ok-only ok-title="Cancel">
        <b-row>

            <b-col cols="9">
                <!-- basic -->
                <b-form-input id="basicInput" v-model="rolename" placeholder="Enter Permission" />
            </b-col>
            <b-col cols="2">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="onSaveRole" variant="primary">
                    Save
                </b-button>
            </b-col>
        </b-row>
    </b-modal>
</component>
</template>

<script>
import {
    BRow,
    BCol,
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    BModal,
    BButton,
    VBModal,
    BCardText,
    BFormInput,
    BFormGroup,
} from 'bootstrap-vue'
import {
    ref,
    onUnmounted
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import userStoreModule from '../userStoreModule'
import Ripple from 'vue-ripple-directive'
import UserEditTabAccount from './UserEditTabAccount.vue'
import axios from 'axios'
import { serverUri } from '@/config'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
    components: {
        BRow,
        BCol,
        BTab,
        BTabs,
        BCard,
        BAlert,
        BLink,
        BButton,
        BModal,
        BCardText,
        VBModal,
        BFormInput,
        BFormGroup,

        UserEditTabAccount,
        ToastificationContent
    },
    data() {
        return {
            rolename: null
        }
    },
    directives: {
        'b-modal': VBModal,
        Ripple,
    },
    methods: {
        onSaveRole() {
            axios.post(`${serverUri}/users/savepermission`, { permission: this.rolename }).then(res => {
                if (res.data) 
                    this.showToast('success', 'Success', 'New permission has been created');
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
    setup() {
        const userData = ref(null)

        const USER_APP_STORE_MODULE_NAME = 'app-user'

        // Register module
        if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
        })

        store.dispatch('app-user/fetchUser', {
                id: router.currentRoute.params.id
            })
            .then(response => {
                userData.value = response.data
            })
            .catch(error => {
                if (error.response.status === 404) {
                    userData.value = undefined
                }
            })

        return {
            userData,
        }
    },
}
</script>

<style>

</style>
