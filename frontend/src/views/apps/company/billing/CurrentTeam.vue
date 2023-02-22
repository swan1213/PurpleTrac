<template>
<b-card>
    <b-card-header>
        <h3>Current Team & Fleet</h3>
    </b-card-header>
    <b-card-body class="p-0">
        <b-row>
            <b-col cols="4" class="border-right-dark">
                <b-row>
                    <b-col cols="6">
                        <h4 class="text-right">
                            <feather-icon icon="UserIcon" size="18" /> Users
                        </h4>
                    </b-col>
                    <b-col cols="6">
                        <span class="text-primary text-left">7</span>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="4" class="border-right-dark">
                <b-row>
                    <b-col cols="6">
                        <h4 class="text-right">
                            <feather-icon icon="UserPlusIcon" size="18" /> Drivers
                        </h4>
                    </b-col>
                    <b-col cols="6">
                        <span class="text-primary text-left">13</span>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="4">
                <b-row>
                    <b-col cols="6">
                        <h4 class="text-right">
                            <feather-icon icon="TruckIcon" size="18" /> Fleet
                        </h4>
                    </b-col>
                    <b-col cols="6"><span class="text-primary text-left">11</span></b-col>
                </b-row>
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
