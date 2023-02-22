<template>
<b-card>
    <b-card-header class="p-0 pb-3">
        <h4>
            MyGroundBiz
            <b-form-checkbox checked="true" name="check-button" switch inline />
        </h4>
    </b-card-header>
    <b-card-body class="p-0">
        <b-row name="first">
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
            <b-col cols="4">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="btnConnect">Test
                </b-button>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col cols="12">
                <h5>Recent Updates</h5>
                <b-row class="recent">
                    <div>Weekly Settlement</div>
                    <div>3-21-2022</div>
                    <div>Success</div>
                </b-row>
                <b-row class="recent">
                    <div>Weekly Settlement</div>
                    <div>3-21-2022</div>
                    <div>Success</div>
                </b-row>
            </b-col>
            <!-- <b-col cols="4">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="$refs.refInputEl.$el.click()" class="btnConnect mt-auto">
                    Manual CSV Upload
                </b-button>
                <b-form-file ref="refInputEl" accept=".csv" :hidden="true" plain />
            </b-col> -->
        </b-row>
    </b-card-body>
</b-card>
</template>

<script>
import {
    BCard,
    BCardHeader,
    BCardBody,
    BButton,
    BFormCheckbox,
    BFormFile,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
    components: {
        BCard,
        BCardHeader,
        BCardBody,
        BButton,
        BFormCheckbox,
        BFormFile,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
    },
    directives: {
        Ripple
    },
};
</script>

<style scoped>
.btnConnect {
    float: right;
}

.recent {
    display: flex;
    justify-content: space-around;
}
</style>
