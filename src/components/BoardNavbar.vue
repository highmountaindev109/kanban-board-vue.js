<template>
    <section class="nav">
        <div class="nav-container">
            <div>
                <div class="nav-disp-btn" @click="handleDisplayToggle">
                    <div class="nav-disp-icon nav-disp-filter">
                        <img :src="filterIcon" alt="icon" />
                    </div>
                    <div class="nav-disp-heading">
                        Display
                    </div>
                    <div class="nav-disp-icon nav-disp-drop">
                        <img :src="downIcon" alt="icon" />
                    </div>
                </div>
                <div :class="['nav-disp-dropdown', { 'nav-disp-dropdown-show': toggleFilter }]">
                    <div class="nav-disp-filters">
                        <div class="nav-dropdown-category">
                            Grouping
                        </div>
                        <div class="nav-dropdown-selector">
                            <select class="nav-selector" name="grouping" v-model="groupBy" @change="updateGroup">
                                <option value="status">Group by Status</option>
                                <option value="user">Group by User</option>
                                <option value="priority">Group by Priority</option>
                            </select>
                        </div>
                    </div>
                    <div class="nav-disp-filters">
                        <div class="nav-dropdown-category">
                            Ordering
                        </div>
                        <div class="nav-dropdown-selector">
                            <select class="nav-selector" name="ordering" v-model="sortBy" @change="updateSort">
                                <option value="priority">Sort by Priority</option>
                                <option value="title">Sort by Title</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useStore } from 'vuex';
import displayImg from '../assets/img/Display.svg'
import downImg from '../assets/img/down.svg'

export default defineComponent({
    name: 'BoardNavbar',
    props: {
        groupByOption: {
            type: Object,
            required: true,
        },
        sortByOption: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        // state of Img and Toggle
        const filterIcon = ref(displayImg);
        const downIcon = ref(downImg);
        const toggleFilter = ref(false);

        // Select Option Occured
        const handleDisplayToggle = () => {
            toggleFilter.value = !toggleFilter.value;
        }

        const store = useStore();
        // getting props data #defineComponent
        const groupBy = ref(props.groupByOption);
        const sortBy = ref(props.sortByOption);

        const updateGroup = () => store.dispatch('updateGroupBy', groupBy.value);
        const updateSort = () => store.dispatch('updateSortBy', sortBy.value);

        return { filterIcon, downIcon, toggleFilter, handleDisplayToggle, updateGroup, updateSort, groupBy, sortBy };
    },
});
</script>

<style></style>