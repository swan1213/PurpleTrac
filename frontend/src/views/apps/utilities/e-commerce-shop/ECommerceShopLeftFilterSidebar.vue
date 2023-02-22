<template>
<div class="sidebar-detached sidebar-left">
    <div class="sidebar">
        <div class="sidebar-shop" :class="{'show': mqShallShowLeftSidebar}">
            <b-row>
                <b-col cols="12">
                    <h6 class="filter-heading d-none d-lg-block">
                        Filters
                    </h6>
                </b-col>
            </b-row>

            <!-- Filters' Card -->
            <b-card>

                <!-- Multi Range -->
                <div class="multi-range-price">
                    <h6 class="filter-title mt-0">
                        Preview
                    </h6>

                </div>
            </b-card>
        </div>
    </div>

    <div class="body-content-overlay" :class="{'show': mqShallShowLeftSidebar}" @click="$emit('update:mq-shall-show-left-sidebar', false)" />
</div>
</template>

<script>
import {
    BRow,
    BCol,
    BCard,
    BFormRadioGroup,
    BLink,
} from 'bootstrap-vue'
import VueSlider from 'vue-slider-component'

export default {
    components: {
        BRow,
        BCol,
        BFormRadioGroup,
        BLink,
        BCard,

        // 3rd Party
        VueSlider,
    },
    props: {
        filters: {
            type: Object,
            required: true,
        },
        filterOptions: {
            type: Object,
            required: true,
        },
        mqShallShowLeftSidebar: {
            type: Boolean,
            required: true,
        },
    },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-slider.scss';
</style><style lang="scss" scoped>
.categories-radio-group,
.brands-radio-group,
.price-range-defined-radio-group {
    ::v-deep>.custom-control {
        margin-bottom: 0.75rem;
    }
}
</style>
