<template>
<b-card>
    <b-card-header class="p-0 pb-3">
        <h4>ELD</h4>
        <b-row>
            <b-col cols="6">
                <b-form-radio plain name="company" value="Omni" v-model="company" checked="">
                    Omnitracs
                </b-form-radio>
            </b-col>
            <b-col cols="6">
                <b-form-radio plain name="company" value="Lytx" v-model="company">
                    Lytx
                </b-form-radio>
            </b-col>
        </b-row>
    </b-card-header>
    <b-card-body class="p-0">
        <b-row>
            <b-col cols="8">
                <b-row>
                    <b-col cols="12">
                        <b-form-group label="Username" label-for="username" label-cols-md="4">
                            <b-form-input id="username" placeholder="Username" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group label="Password" label-for="password" label-cols-md="4">
                            <b-form-input id="password" placeholder="Password" />
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="4" class="text-right">
                <b-button variant="primary" v-ripple.400="'rgba(255, 255, 255, 0.15)'">Test</b-button>
            </b-col>
        </b-row>
        <hr />
        <b-row class="pt-1">
            <b-col cols="12">
                <b-form-group label="Payroll" label-for="payroll" label-cols-md="2">
                    <b-form-input id="payroll" placeholder="payroll" />
                </b-form-group>
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
    BFormGroup,
    BFormInput,
    BFormRadio,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
    components: {
        BRow,
        BCol,
        BCard,
        BCardHeader,
        BCardBody,
        BButton,
        BFormGroup,
        BFormInput,
        BFormRadio,
    },
    directives: {
        Ripple
    },
    data() {
        return {
            company: "Omni",
        };
    },
};
</script>
