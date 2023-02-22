<template>
<b-card no-body>
   <b-card-header>
      <h3>MMR</h3>
      <div>
         <b-button class="mr-2" v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-center variant="primary">
            <feather-icon icon="UploadIcon" v-b-modal.modal-center /> Signature
         </b-button>

         <b-button variant="primary">
            <feather-icon icon="SendIcon" /> Send MMRs
         </b-button>
      </div>
   </b-card-header>

   <b-card-body>
      <h5 class="mb-2">MAIN INFO</h5>

      <b-row>
         <b-col md="6">
            <b-form-group label="Year" label-for="h-first-name" label-cols-md="4">
               <v-select id="h-first-name" v-model="selectedYear" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="years" />
            </b-form-group>
         </b-col>
         <b-col md="6">
            <b-form-group label="Month" label-for="h-first-name" label-cols-md="4">
               <v-select id="h-first-name" v-model="selectedMonth" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="months" />
            </b-form-group>
         </b-col>
         <b-col md="6">
            <b-form-group label="Sign" label-for="h-first-name" label-cols-md="4">
               <v-select id="h-first-name" v-model="selectedSign" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="name" :options="signs" />
            </b-form-group>
         </b-col>
         <b-col md="6">
            <b-form-group label="Date Completed" label-for="h-first-name" label-cols-md="4">
               <b-form-datepicker id="h-first-name" v-model="selectedDate" class="mb-1" />
            </b-form-group>
         </b-col>
      </b-row>
   </b-card-body>

   <b-modal id="modal-center" centered title="Upload Signature" ok-only ok-title="Cancel">
      <b-form-file v-model="file" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..." />
      <b-button class="mt-1" @click="uploadSignature" variant="primary">Upload</b-button>
   </b-modal>
</b-card>
</template>

<script>
import {
   BCard,
   BCardHeader,
   BCardBody,
   BForm,
   BFormGroup,
   BFormInput,
   BFormFile,
   BRow,
   BCol,
   BButton,
   BFormDatepicker,
   VBModal,
   BModal,
} from 'bootstrap-vue'
import {
   heightTransition
} from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import axios from 'axios'
import {
   serverUri
} from '@/config'
import {
   getUserData
} from "@/auth/utils";
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
   components: {
      BCard,
      BCardHeader,
      BCardBody,
      BForm,
      BFormGroup,
      BFormInput,
      BFormFile,
      BRow,
      BCol,
      BButton,
      BFormDatepicker,
      vSelect,
      BModal,
   },
   directives: {
      'b-modal': VBModal,
      Ripple,
   },
   mixins: [heightTransition],
   data() {
      return {
         file: null,
         years: [],
         signs: [],
         selectedYear: null,
         selectedSign: null,
         months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
         selectedMonth: null,
         completed: [],
         selectedCompleted: null,
         selectedDate: null,
         selectedTractor: null,
         items: [{
            id: 1,
            selected: 'male',
            selected1: 'designer',
            prevHeight: 0,
         }],
         nextTodoId: 2,
         forms: ['Yes', 'No'],
         tractors: [],
         selectedOutOfService: null,
         selectedMaintenance: null,
      }
   },
   mounted() {

      this.selectedMonth = new Date().toLocaleDateString('en-US', {
         month: 'long'
      })

      const date = new Date();
      const currentYear = date.getFullYear();
      this.selectedYear = currentYear;
      this.selectedDate = date;

      for (let i = currentYear - 3; i <= currentYear; i++) {
         this.years.push(i);
      }

      axios.get(`${serverUri}/fleet/getsign/${getUserData().company_id}`).then(res => {
         this.signs = res.data;
      })

   },
   created() {
      window.addEventListener('resize', this.initTrHeight)
   },
   destroyed() {
      window.removeEventListener('resize', this.initTrHeight)
   },
   methods: {
      uploadSignature() {
         const form = new FormData();

         form.append('file', this.file);
         form.append('company', getUserData().company_id)

         axios.post(`${serverUri}/fleet/savesign`, form).then(res => {
            if (res.data.affectedRows)
               this.showToast('success', 'Success', 'The signature has been uploaded.')
         })
      },
      showToast(variant, title, text) {
         this.$toast({
            component: ToastificationContent,
            props: {
               title: title,
               icon: 'BellIcon',
               text: text,
               variant,
            },
         })
      },
   },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
