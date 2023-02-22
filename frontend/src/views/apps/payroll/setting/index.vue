<template>
  <div>
    <b-card no-body>
      <b-card-header><h3>Drivers list</h3></b-card-header>
      <b-card-body>
        <b-row class="d-flex align-items-center mb-1">
          <b-col sm="4">
            <b-form-group label="Driver ID" label-for="driver_id">
              <b-form-input
                id="driver_id"
                placeholder="Driver ID"
                v-model="driver_id"
              />
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label="Driver Name" label-for="driver_name">
              <b-form-input
                id="driver_name"
                placeholder="Driver Name"
                v-model="driver_name"
              />
            </b-form-group>
          </b-col>
          <!-- <b-col sm="4">
            <b-form-group label="Min Rate" label-for="min_rate">
              <b-form-input
                id="min_rate"
                placeholder="Min Rate"
                v-model="min"
              />
            </b-form-group>
          </b-col> -->
          <!-- <b-col sm="4">
            <b-form-group label="Max Rate" label-for="max_rate">
              <b-form-input
                id="max_rate"
                placeholder="Max Rate"
                v-model="max"
              />
            </b-form-group>
          </b-col> -->
          <b-col sm="1">
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-primary"
              @click="handleChange"
            >
              Search
            </b-button>
          </b-col>
          <b-col sm="3">
            <b-button
              class="ml-2"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-primary"
              :to="{ name: 'apps-payroll-edit', params: { id: 0 } }"
            >
              Fixed rate setting
            </b-button>
          </b-col>
        </b-row>
        <b-table
          striped
          hover
          responsive
          class="position-relative"
          :per-page="perPage"
          :current-page="currentPage"
          :items="dataSource"
          :fields="fields"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >
          <template #cell(avatar)="data">
            <b-avatar :src="data.value" />
          </template>

          <template #cell(work_status)="data">
            <b-badge v-if="data.value == 1" pill variant="light-success"
              >Working now</b-badge
            >
            <b-badge v-else pill variant="light-danger">No longer working</b-badge>
          </template>

          <template #cell(action)="data">
            <span>
              <b-dropdown
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template v-slot:button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                  />
                </template>
                <b-dropdown-item
                  :to="{ path: '/apps/payroll/edit/' + data.item.id }"
                >
                  <feather-icon icon="Edit2Icon" class="mr-50" />
                  <span>Edit</span>
                </b-dropdown-item>
                <b-dropdown-item @click="onRemove(data.item.id)">
                  <feather-icon icon="TrashIcon" class="mr-50" />
                  <span>Delete</span>
                </b-dropdown-item>
                <b-dropdown-item
                  @click="onChange(data.item.id, data.item.work_status)"
                >
                  <feather-icon icon="RepeatIcon" class="mr-50" />
                  <span>Change Status</span>
                </b-dropdown-item>
              </b-dropdown>
            </span>
          </template>
        </b-table>

        <b-card-body class="d-flex justify-content-between flex-wrap pt-0">
          <!-- page length -->
          <b-form-group
            label="Per Page"
            label-cols="6"
            label-align="left"
            label-size="sm"
            label-for="sortBySelect"
            class="text-nowrap mb-md-0 mr-1"
          >
            <b-form-select
              id="perPageSelect"
              v-model="perPage"
              size="sm"
              inline
              :options="pageOptions"
            />
          </b-form-group>

          <!-- pagination -->
          <div>
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              first-number
              last-number
              prev-class="prev-item"
              next-class="next-item"
              class="mb-0"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </div>
        </b-card-body>
      </b-card-body>
    </b-card>
    <b-card no-body>
      <b-card-header><h3>Payroll Setting</h3></b-card-header>
      <b-card-body>
        <b-form @submit.prevent>
          <b-row>
            <b-col cols="12">
              <b-form-group
                label="Sending Email method"
                label-for="sending_method"
                label-cols-md="4"
              >
                <div class="demo-inline-spacing">
                  <b-form-radio
                    v-model="sending_method"
                    name="method"
                    value="1"
                  >
                    Automatically
                  </b-form-radio>
                  <b-form-radio
                    v-model="sending_method"
                    name="method"
                    value="0"
                  >
                    Manually
                  </b-form-radio>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                label="Delivery Date"
                label-for="delivery_date"
                label-cols-md="4"
              >
                <v-select
                  label="text"
                  :options="week"
                  v-model="delivery_date"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                label="Payment Date"
                label-for="payment_date"
                label-cols-md="4"
              >
                <v-select label="text" :options="week" v-model="payment_date" />
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col offset-md="4">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1"
                @click="onSave"
              >
                Save Setting
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
  BTable,
  BButton,
  BPagination,
  BForm,
  BFormGroup,
  BFormInput,
  BFormRadio,
  BFormSelect,
  BDropdown,
  BDropdownItem,
  BAvatar,
  BBadge,
  BRow,
  BCol,
} from "bootstrap-vue";
import VSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import axios from "axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { getUserData } from "@/auth/utils";
import { serverUri } from "@/config";

const week = [
  { text: "Monday" },
  { text: "Tuesday" },
  { text: "Wednesday" },
  { text: "Thursday" },
  { text: "Friday" },
  { text: "Saturday" },
  { text: "Sunday" },
];

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BTable,
    BButton,
    BPagination,
    BForm,
    BFormGroup,
    BFormInput,
    BFormRadio,
    BFormSelect,
    VSelect,
    BDropdown,
    BDropdownItem,
    BAvatar,
    BBadge,
    BRow,
    BCol,
  },
  directives: { Ripple },
  data() {
    return {
      week,
      dataSource: [],
      dataStore: [],
      sending_method: null,
      delivery_date: null,
      payment_date: null,
      driver_id: "",
      driver_name: "",
      min: 0,
      max: 100000,
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortDesc: false,
      sortDirection: "desc",
      filter: " ",
      filterOn: [],
      fields: [
        {
          key: "no",
          label: "No",
          sortable: true,
        },
        {
          key: "driver_id",
          label: "DRIVER ID",
          sortable: true,
        },
        {
          key: "driver_name",
          label: "DRIVER NAME",
        },
        {
          key: "work_status",
          label: "WORK STATUS",
          sortable: true,
        },
        {
          key: "price_per_mile",
          label: "PRICE PER MILE",
          sortable: true,
        },
        {
          key: "action",
          label: "ACTIONS",
        },
      ],
    };
  },
  created() {
    const company = getUserData() ? (getUserData().role === 'Super Admin' ? 0 : getUserData().company_id) : 0;
    
    axios.get(`${serverUri}/api/payroll/settingIndex/${company}`).then((res) => {
      if (res) {
        const temp = [];
        res.data.result
          .sort(function (a, b) {
            return b.work_status - a.work_status;
          })
          .forEach((p, i) => {
            temp.push({ ...p, no: i + 1 });
          });
        this.dataSource = temp;
        this.dataStore = temp;
        this.sending_method = res.data.sending_method.value
          ? res.data.sending_method.value
          : 0;
        this.delivery_date = res.data.delivery_date.value
          ? res.data.delivery_date.value
          : { text: "Monday" };
        this.payment_date = res.data.payment_date.value
          ? res.data.payment_date.value
          : { text: "Friday" };
      }
    });
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    handleChange() {
      this.dataSource = this.dataStore
        .filter((p) => (this.driver_id ? p.driver_id == this.driver_id : p))
        .filter((p) =>
          this.driver_name ? p.driver_name == this.driver_name : p
        )
        .filter((p) => (this.min ? p.price_per_mile >= this.min : p))
        .filter((p) => (this.max ? p.price_per_mile <= this.max : p));
    },
    onSave() {
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
        axios
          .post(`${serverUri}/api/payroll/payroll_settingSave`, {
            sending: this.sending_method,
            delivery: this.delivery_date.text,
            payment: this.payment_date.text,
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
            return;
          });
      });
    },
    onRemove(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        axios
          .delete(`${serverUri}/api/payroll/settingRemove/${id}`)
          .then((res) => {
            if (res.data.success)
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: "Success",
                  icon: "BellIcon",
                  text: "Driver removed successfully!",
                  variant: "success",
                },
              });
            return;
          });
      });
    },
    onChange(id, status) {
      axios
        .get(`${serverUri}/api/payroll/settingChange/${id}/${status}`)
        .then((res) => {
          if (res.data.success) {
            this.dataSource = this.dataSource
              .map((p, i) =>
                p.id == id
                  ? {
                      no: i + 1,
                      id: p.id,
                      driver_id: p.driver_id,
                      driver_name: p.driver_name,
                      price_per_mile: p.price_per_mile,
                      work_status: status == 1 ? 0 : 1,
                    }
                  : p
              )
              .sort(function (a, b) {
                return b.work_status - a.work_status;
              })
              .map((p, i) => {
                return { ...p, no: i + 1 };
              });
          }
        });
    },
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>