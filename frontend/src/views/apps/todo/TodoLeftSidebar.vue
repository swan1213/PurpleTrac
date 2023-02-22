<template>
<div class="sidebar-left">
    <div class="sidebar">
        <div class="sidebar-content todo-sidebar">
            <div class="todo-app-menu">
                <div class="add-task">
                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" block @click="$emit('update:is-task-handler-sidebar-active', true); $emit('close-left-sidebar')">
                        Add Task
                    </b-button>
                </div>
                <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="sidebar-menu-list scroll-area">
                    <!-- Filters -->
                    <b-list-group class="list-group-filters">
                        <b-list-group-item v-for="filter in taskFilters" :key="filter.title + $route.path" :to="filter.route" :active="isDynamicRouteActive(filter.route)" @click="$emit('close-left-sidebar')">
                            <feather-icon :icon="filter.icon" size="18" class="mr-75" />
                            <span class="align-text-bottom line-height-1">{{ filter.title }}</span>
                        </b-list-group-item>
                    </b-list-group>

                    <!-- Tags -->
                    <div class="mt-3 px-2 d-flex justify-content-between">
                        <h6 class="section-label mb-1">
                            Tags
                        </h6>
                        <feather-icon class="cursor-pointer" v-b-modal.modal-center icon="PlusIcon" />
                    </div>

                    <b-list-group class="list-group-labels">
                        <b-list-group-item v-for="tag in taskTags" :key="tag.title + $route.path" :to="tag.route" :active="isDynamicRouteActive(tag.route)" @click="$emit('close-left-sidebar')">
                            <span class="bullet bullet-sm mr-1" :class="`bullet-${tag.color}`" />
                            <span>{{ tag.title }}</span>
                        </b-list-group-item>
                    </b-list-group>

                </vue-perfect-scrollbar>
            </div>
        </div>
    </div>

    <!-- modal vertical center -->
    <b-modal id="modal-center" centered title="Create Tag" ok-only ok-title="Cancel">
        <b-form-group label="Tag Name" label-for="tag-name">
            <b-form-input id="tag-name" placeholder="Enter Tag Name" />
        </b-form-group>
        <b-form-group label="Tag Color" label-for="tag-color">
            <b-form-input id="tag-color" placeholder="Enter Tag Color" />
        </b-form-group>
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">
            Save
        </b-button>
    </b-modal>
</div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {
    BModal,
    VBModal,
    BButton,
    BFormInput,
    BFormGroup,
    BListGroup,
    BListGroupItem
} from 'bootstrap-vue'
import {
    isDynamicRouteActive
} from '@core/utils/utils'
import Ripple from 'vue-ripple-directive'

export default {
    directives: {
        Ripple,
    },
    components: {
        BButton,
        BModal,
        BListGroup,
        BFormInput,
        BFormGroup,
        BListGroupItem,
        VuePerfectScrollbar,
    },
    props: {
        taskTags: {
            type: Array,
            required: true,
        },
    },
    directives: {
        'b-modal': VBModal,
        Ripple,
    },
    setup() {
        const perfectScrollbarSettings = {
            maxScrollbarLength: 60,
        }

        const taskFilters = [{
                title: 'My Task',
                icon: 'MailIcon',
                route: {
                    name: 'apps-todo',
                }
            },
            {
                title: 'Pending',
                icon: 'CheckIcon',
                route: {
                    name: 'apps-todo-filter',
                    params: {
                        filter: 'pending'
                    }
                }
            },
            {
                title: 'In Progress',
                icon: 'StarIcon',
                route: {
                    name: 'apps-todo-filter',
                    params: {
                        filter: 'in progress'
                    }
                }
            },
            {
                title: 'Completed',
                icon: 'FlagIcon',
                route: {
                    name: 'apps-todo-filter',
                    params: {
                        filter: 'completed'
                    }
                }
            },
            {
                title: 'Cancelled',
                icon: 'ScissorsIcon',
                route: {
                    name: 'apps-todo-filter',
                    params: {
                        filter: 'cancelled'
                    }
                }
            },
        ]

        return {
            perfectScrollbarSettings,
            taskFilters,
            isDynamicRouteActive,
        }
    },
}
</script>

<style>

</style>
