<template>
<div>
    <!-- <navbar flag="connections" /> -->
    <my-ground-biz />
    <location-info />
</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import {
    BBreadcrumb,
    BBreadcrumbItem
} from "bootstrap-vue";
import MyGroundBiz from "./MyGroundBiz.vue";
import LocationInfo from "./LocationInfo.vue";

export default {
    components: {
        Navbar,
        MyGroundBiz,
        LocationInfo,
        BBreadcrumb,
        BBreadcrumbItem,
    },
};
</script>
