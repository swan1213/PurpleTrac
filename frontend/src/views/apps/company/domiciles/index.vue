<template>
<div>
    <!-- <navbar flag="domiciles" /> -->
    <current />
</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Current from "./CurrentDomiciles.vue";
import Bueiness from "./BusinessContact.vue";
import {
    BBreadcrumb,
    BBreadcrumbItem
} from "bootstrap-vue";

export default {
    components: {
        Navbar,
        Current,
        Bueiness,
        BBreadcrumb,
        BBreadcrumbItem
    },
};
</script>
