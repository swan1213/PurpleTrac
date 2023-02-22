<template>
  <div>
    <b-card no-body>
      <b-card-header><h3>Fixed Rate</h3></b-card-header>
      <b-card-body>
        <div v-if="flag == 0">
          <b-form class="mb-1">
            <b-row>
              <b-col cols="12">
                <b-col offset-md="4" offset-lg="6">
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                    class="mr-1"
                    @click="turnBack"
                  >
                    Cancel
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                    class="mr-1"
                    @click="onNew"
                  >
                    Add Fixed Rate
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                    class="mr-1"
                    @click="onSave('fixed')"
                  >
                    Update Setting
                  </b-button>
                </b-col>
              </b-col>
            </b-row>
          </b-form>
          <b-table-simple responsive bordered class="position-relative">
            <b-thead>
              <b-tr>
                <b-th class="text-center">FROM MILES</b-th>
                <b-th class="text-center">TO MILES</b-th>
                <b-th class="text-center">FIXED RATE</b-th>
                <b-th class="text-center">ACTION</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="p in source" v-bind:key="p.index">
                <b-td>
                  <b-input-group>
                    <b-form-input
                      type="number"
                      id="price_per_mile"
                      v-model="p.from_miles"
                    />
                    <b-input-group-append is-text>mi.</b-input-group-append>
                  </b-input-group>
                </b-td>
                <b-td>
                  <b-input-group>
                    <b-form-input
                      type="number"
                      id="price_per_mile"
                      v-model="p.to_miles"
                    />
                    <b-input-group-append is-text>mi.</b-input-group-append>
                  </b-input-group>
                </b-td>
                <b-td>
                  <b-input-group>
                    <b-input-group-prepend is-text>
                      <feather-icon icon="DollarSignIcon" />
                    </b-input-group-prepend>
                    <b-form-input
                      type="number"
                      id="price_per_mile"
                      v-model="p.fixed_rate"
                    />
                  </b-input-group>
                </b-td>
                <b-td class="text-center">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                    @click="onRemove(p.index)"
                  >
                    <feather-icon icon="TrashIcon" size="18" />
                  </b-button>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
        <b-form @submit.prevent v-else>
          <b-row>
            <b-col cols="12">
              <b-form-group
                label="Driver ID"
                label-for="driver_id"
                label-cols-md="4"
              >
                <b-form-input
                  id="driver_id"
                  placeholder="Driver ID"
                  v-model="driver.id"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                label="Driver Name"
                label-for="driver_name"
                label-cols-md="4"
              >
                <b-form-input
                  id="driver_name"
                  placeholder="Driver Name"
                  v-model="driver.name"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                label="Price Per Mile"
                label-for="price_per_mile"
                label-cols-md="4"
              >
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <feather-icon icon="DollarSignIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    type="number"
                    id="price_per_mile"
                    v-model="driver.price"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col offset-md="4">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1"
                @click="onSave('rate')"
              >
                Update Rate
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="outline-secondary"
                :to="turnBack"
              >
                Cancel
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import {
  BCard,
  BCardHeader,
  BCardBody,
  BButton,
  BTableSimple,
  BThead,
  BTbody,
  BTr,
  BTh,
  BTd,
  BForm,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import router from "@/router";
import axios from "axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { serverUri } from "@/config";
import {
    getUserData
} from "@/auth/utils";
import { mapActions } from 'vuex'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BButton,
    BTableSimple,
    BThead,
    BTbody,
    BTr,
    BTh,
    BTd,
    BFormInput,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
  },
  directives: { Ripple },
  data() {
    return {
      flag: "",
      driver: { id: "", name: "", price: "" },
      source: [
        { index: 0, from_miles: 0, to_miles: 0, fixed_rate: 0 },
        { index: 1, from_miles: 0, to_miles: 0, fixed_rate: 0 },
      ],
    };
  },
  created() {
    this.flag = router.currentRoute.params.id;
    if (router.currentRoute.params.id > 0) {
      axios
        .get(
          `${serverUri}/api/payroll/settingEdit/${router.currentRoute.params.id}`
        )
        .then((res) => {
          this.driver = {
            id: res.data[0].driver_id,
            name: res.data[0].driver_name,
            price: res.data[0].price_per_mile,
          };
        });
    } else {
      const company = getUserData().company_id;

      axios.get(`${serverUri}/api/payroll/getfr/${company}`).then(res => {
        this.source = res.data
      })
    }
  },
  methods: {
    turnBack() {
      return window.history.back(-1);
    },
    onNew() {
      this.source = [
        ...this.source,
        {
          index: this.source.length,
          from_miles: 0,
          to_miles: 0,
          fixed_rate: 0,
        },
      ];
    },
    onRemove(index) {
      this.source = this.source.filter((p) => p.index != index);
    },
    onSave(flag) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
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
          flag === "fixed"
            ? axios
                .post(`${serverUri}/api/payroll/fixed_settingSave`, this.source)
                .then((res) => {
                  if (res.data.success)
                    this.$toast({
                      component: ToastificationContent,
                      props: {
                        title: "Success",
                        icon: "BellIcon",
                        text: "Setting saved successfully!",
                        variant: "success",
                      },
                    });
                  this.$router.push("/apps/payroll/setting");
                })
            : axios
                .post(`${serverUri}/api/payroll/rate_settingSave`, {
                  ...this.driver,
                  dId: router.currentRoute.params.id,
                })
                .then((res) => {
                  if (res.data.success)
                    this.$toast({
                      component: ToastificationContent,
                      props: {
                        title: "Success",
                        icon: "BellIcon",
                        text: "Setting saved successfully!",
                        variant: "success",
                      },
                    });
                  this.$router.push("/apps/payroll/setting");
                });
        }
      });
    },
  },
};
</script>