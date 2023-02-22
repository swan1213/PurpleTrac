<template>
<b-row>
    <b-col cols="6">
        <b-card>
            <b-card-header class="p-0">
                <h3>Need Help?</h3>
            </b-card-header>
            <b-card-body class="p-0">
                <b-row>
                    <b-col cols="4">
                        <feather-icon icon="HelpCircleIcon" size="150" />
                    </b-col>
                    <b-col cols="8">
                        <h5>Questions?</h5>
                        <p>
                            For more information about the individual plan, visit our
                            <a href="/#_">Frequently Asked Questions</a>.
                        </p>
                        <p>
                            individual plan funcionalities might vary from time to time with
                            a prior notice
                        </p>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
    </b-col>
    <b-col cols="6">
        <b-card>
            <b-card-header></b-card-header>
            <b-card-body class="p-0">
                <b-row>
                    <b-col cols="4">
                        <feather-icon icon="RssIcon" size="150" />
                    </b-col>
                    <b-col cols="8">
                        <h5>Contact Support</h5>
                        <p>
                            Our support team is here to help with any questions you might
                            have.
                        </p>
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">Contact Support</b-button>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
    </b-col>
</b-row>
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
