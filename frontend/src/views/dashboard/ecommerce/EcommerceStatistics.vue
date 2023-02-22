<template>
  <b-card
    v-if="data"
    no-body
    class="card-statistics"
  >
    <b-card-header>
      <b-card-title>Statistics</b-card-title>
      <b-card-text class="font-small-2 mr-25 mb-0">
        <!-- Updated 1 month ago -->
      </b-card-text>
      <v-select
        style="width: 200px"
        v-model="selectedDomicile"
        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
        label="domicile"
        :options="domiciles"
      />
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col
          v-for="item in data"
          :key="item.icon"
          xl="3"
          sm="6"
          :class="item.customClass"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="48"
                :variant="item.color"
              >
                <feather-icon
                  size="24"
                  :icon="item.icon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ item.subtitle === 'Revenue' || item.subtitle === 'Fuel' ? '$' : '' }}{{ parseFloat(item.title).toLocaleString('en-US') }}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{ item.subtitle }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'
import axios from 'axios'
import { serverUri } from '@/config'
import vSelect from 'vue-select'
import { getUserData } from "@/auth/utils";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    vSelect,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      domiciles: [],
      selectedDomicile: "All",
    }
  },
  created() {
    axios.post(`${serverUri}/schedule/getdomicile`, {
        company: getUserData().company_id
    }).then(res => {
        this.domiciles = [{domicile: res.data.domicile}, ...res.data]
    })
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>