<template>
<div>
    <!-- <navbar flag="billing" /> -->
    <plan-detail />
    <current-team />
    <need-help />
</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PlanDetail from "./PlanDetails.vue";
import CurrentTeam from "./CurrentTeam.vue";
import NeedHelp from "./NeedHelp.vue";
import {
    BBreadcrumb,
    BBreadcrumbItem
} from "bootstrap-vue";

export default {
    components: {
        Navbar,
        PlanDetail,
        CurrentTeam,
        NeedHelp,
        BBreadcrumb,
        BBreadcrumbItem,
    },
};
</script>
