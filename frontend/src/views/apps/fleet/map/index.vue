<template>
<b-card no-body>
   <b-card-body>
      <b-tabs align="right">
         <div>
            <b-row>
               <b-col lg="3" md="4">
                  <b-form-group label="Domicile:" label-for="h-first-name" label-cols-md="4">
                     <v-select id="h-first-name" v-model="selectedDomicile" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="domiciles" />
                  </b-form-group>
               </b-col>
               <b-col lg="7" md="6" />
               <b-col lg="1" md="1">
                  <!-- filter -->
                  <b-form-group label-align-sm="left" label-size="md" label-for="filterInput" class="mb-0">
                     <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">
                        Filter
                     </b-button>
                  </b-form-group>
               </b-col>
            </b-row>
         </div>

         <b-tab title="Locations">
            <div class="col-md-3 col-sm-3 col-4 bg-white" id="driver-info-area"></div>
            <div class="col-md-9 col-sm-9 col-8" id="map-canvas"></div>
         </b-tab>

         <b-tab title="Driver Information">
            
         </b-tab>

         <b-tab active title="Schedule">

         </b-tab>
      </b-tabs>
   </b-card-body>
</b-card>
</template>
<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBmBJ0vEknu8D03PeOQGkUkaPXk00SMMY&callback=initMap"></script>
<script>
import {
   BTab,
   BRow,
   BCol,
   BTabs,
   BCard,
   BCardHeader,
   BCardBody,
   BFormGroup,
   BPagination,
   BButton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

export default {
   components: {
      BTab,
      BTabs,
      BRow,
      BCol,
      BCard,
      BCardHeader,
      BCardBody,
      BFormGroup,
      BButton,
      BPagination,
      vSelect,
   },
   directives: {
      Ripple,
   },
   data() {
      return {
         domiciles: [],
         selectedDomicile: {},
      }
   },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
