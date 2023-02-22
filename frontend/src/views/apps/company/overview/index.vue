<template>
<div>
    <!-- <navbar flag="overview" /> -->
    <overview-form />
</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import OverviewForm from "./Form.vue";
import {
    BBreadcrumb,
    BBreadcrumbItem
} from "bootstrap-vue";

export default {
    components: {
        Navbar,
        OverviewForm,
        BBreadcrumb,
        BBreadcrumbItem
    },
};
</script>
