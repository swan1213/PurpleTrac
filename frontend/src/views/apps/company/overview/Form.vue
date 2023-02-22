<template>
<b-card no-body>
    <b-card-header>
        <h3>Details</h3>
    </b-card-header>
    <b-card-body>
        <validation-observer ref="simpleRules">
            <b-form class="mb-2 px-5">
                <b-row>
                    <b-col cols="12">
                        <b-form-group label="Company Name" label-for="company-name" label-cols-md="4">
                            <validation-provider #default="{ errors }" name="Company Name" rules="required">
                                <b-form-input id="company-name" v-model="model.name" :state="errors.length > 0 ? false : null" placeholder="Company Name" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group label="Company Email" label-for="company-email" label-cols-md="4">
                            <validation-provider #default="{ errors }" name="Company Email" rules="required|email">
                                <b-form-input id="company-email" type="email" v-model="model.email" :state="errors.length > 0 ? false : null" placeholder="Company Email" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group label="Brand" label-for="brand" label-cols-md="4">
                            <validation-provider #default="{ errors }" name="Brand" rules="required">
                                <b-form-input id="brand" type="email" v-model="model.brand" :state="errors.length > 0 ? false : null" placeholder="Company Brand" />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group label="Global Contact Info" label-for="global-contact" label-cols-md="4">
                            <b-form-input id="global-contact" type="text" v-model="model.contact" placeholder="Global Contact Info" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group label="Logo" label-for="logo" label-cols-md="4">
                            <b-form-file id="logo" accept="image/*" v-model="model.logo" />
                        </b-form-group>
                    </b-col>

                    <!-- submit and reset -->
                    <b-col offset-md="4">
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1" @click.prevent="onSubmit">
                            Submit
                        </b-button>
                        <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
                            Reset
                        </b-button>
                    </b-col>
                </b-row>
            </b-form>
        </validation-observer>
    </b-card-body>
</b-card>
</template>

<script>
import {
    BCard,
    BCardHeader,
    BCardBody,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BFormFile,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import {
    ValidationProvider,
    ValidationObserver
} from "vee-validate";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    required,
    email
} from "@validations";
import axios from "axios";
import {
    serverUri
} from "../../../../config";

export default {
    components: {
        BCard,
        BCardHeader,
        BCardBody,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BFormCheckbox,
        BForm,
        BButton,
        BFormFile,
        ValidationProvider,
        ValidationObserver,
        ToastificationContent,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            required,
            email,
            model: {
                name: "",
                email: "",
                contact: "",
                brand: "",
                logo: null,
            },
        };
    },
    methods: {
        onSubmit() {
            this.$refs.simpleRules.validate().then((isValid) => {
                if (isValid) {
                    this.$swal({
                        title: "Are you sure?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Save",
                        customClass: {
                            confirmButton: "btn btn-primary",
                            cancelButton: "btn btn-outline-danger ml-1",
                        },
                        buttonsStyling: false,
                    }).then((result) => {
                        if (result.value) {
                            const form = new FormData();
                            // form.append("name", this.model.name);
                            // form.append("email", this.model.email);
                            // form.append("contact", this.model.contact);
                            // form.append("logo", this.model.logo);
                            // form.append("brand", this.model.brand);
                            axios
                                .post(`${serverUri}/api/company/overviewSave`, { name: this.model.name, email: this.model.email, contact: this.model.contact, brand: this.model.brand })
                                .then((res) => {
                                    if (res.data.success) {
                                        this.$toast({
                                            component: ToastificationContent,
                                            props: {
                                                title: "Success",
                                                icon: "BellIcon",
                                                text: "Company Infomation is saved successfully.",
                                                variant: "success",
                                            },
                                        });
                                        // this.model = {
                                        //     name: "",
                                        //     email: "",
                                        //     contact: "",
                                        //     brand: "",
                                        //     logo: null,
                                        // };
                                    } else {
                                        this.$toast({
                                            component: ToastificationContent,
                                            props: {
                                                title: "Error occured",
                                                icon: "BellIcon",
                                                text: "Company Infomation already exists.",
                                                variant: "danger",
                                            },
                                        });
                                    }
                                });
                        }
                    });
                }
            });
        },
    },
};
</script>
