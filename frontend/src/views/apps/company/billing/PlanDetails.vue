<template>
<b-card>
    <b-card-header>
        <h3>Plan Details</h3>
    </b-card-header>
    <b-card-body class="p-0">
        <b-row>
            <b-col cols="6">
                <b-row>
                    <b-col cols="6" class="border-right-dark">
                        <h4 class="text-center">Current Plan</h4>
                        <p class="text-primary text-center">Basic</p>
                    </b-col>
                    <b-col cols="6">
                        <h4 class="text-center">Days left</h4>
                        <p class="text-primary text-center">24</p>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="6" class="text-center">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" to="/apps/company/billing/choose">Upgrade Now</b-button>
            </b-col>
        </b-row>
    </b-card-body>
</b-card>
</template>

<script>
import {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
    components: {
        BRow,
        BCol,
        BCard,
        BCardHeader,
        BCardBody,
        BButton
    },
    directives: {
        Ripple,
    },
};
</script>
