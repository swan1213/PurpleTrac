<template>
<b-card class="profile-header mb-2" body-class="p-0">
    <!-- profile navbar -->
    <div class="profile-header-nav">
        <b-navbar toggleable="md">
            <!-- toggle button -->
            <b-navbar-toggle class="ml-auto" target="nav-text-collapse">
                <feather-icon icon="AlignJustifyIcon" class="feather feather-menu" size="21" />
            </b-navbar-toggle>
            <!--/ toggle button -->

            <!-- collapse -->
            <b-collapse id="nav-text-collapse" is-nav>
                <b-tabs pills class="profile-tabs mt-1 mt-md-0 mx-auto" nav-class="mb-0">
                    <template #tabs-start>
                        <b-nav-item role="presentation" :active="flag === 'overview'" to="/apps/company/overview">
                            <span class="d-block d-md-block">Overview</span>
                        </b-nav-item>
                        <b-nav-item role="presentation" :active="flag === 'connections'" to="/apps/company/connections">
                            <span class="d-block d-md-block">Connections</span>
                        </b-nav-item>
                        <b-nav-item role="presentation" :active="flag === 'billing'" to="/apps/company/billing">
                            <span class="d-block d-md-block">Billing</span>
                        </b-nav-item>
                        <b-nav-item role="presentation" :active="flag === 'domiciles'" to="/apps/company/domiciles">
                            <span class="d-block d-md-block">Domiciles</span>
                        </b-nav-item>
                    </template>
                </b-tabs>
            </b-collapse>
            <!--/ collapse -->
        </b-navbar>
    </div>
    <!--/ profile navbar -->
</b-card>
</template>

<script>
import {
    BCard,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BTabs,
    BNavItem,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
    props: {
        flag: String,
    },
    components: {
        BCard,
        BTabs,
        BNavItem,
        BNavbar,
        BNavbarToggle,
        BCollapse,
    },
    directives: {
        Ripple,
    },
};
</script>

<style>
[dir] .navbar-light {
    background: none;
}
</style>
