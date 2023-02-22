<template>
<b-card>
    <b-card-header class="p-0 pb-1">
        <h4>Current Domiciles</h4>
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">Create Geofence</b-button>
    </b-card-header>
    <b-card-body class="p-0">
        <b-table responsive="sm" hover :items="items" />
    </b-card-body>
    <b-card-footer>
        <b-button variant="primary" class="btnEdit" v-ripple.400="'rgba(255, 255, 255, 0.15)'">Edit</b-button>
    </b-card-footer>
</b-card>
</template>

<script>
import {
    BTable,
    BButton,
    BCard,
    BCardHeader,
    BCardBody,
    BCardFooter,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
    components: {
        BTable,
        BButton,
        BCard,
        BCardHeader,
        BCardBody,
        BCardFooter,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            items: [{
                ID: "",
                Name: "",
                Address: "",
                Geofence: "",
                LH_Manager: "",
                Email: "",
            }, ],
        };
    },
};
</script>

<style scoped>
.btnEdit {
    float: right;
}
</style>
