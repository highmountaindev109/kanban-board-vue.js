<template>
    <div class="list-container">
        <div class="list-header">
            <div class="list-header-left">
                <div class="list-title">
                    <div class="card-item">
                        <h3 class="list-title">{{ group }}</h3>
                    </div>
                    <div v-if="tickets.length">
                        <div v-for="ticket in sortedTickets" :key="ticket.id" class="list-card-items">
                            <BoardCard :ticket="ticket" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BoardCard from './BoardCard.vue';

export default {
    components: { BoardCard },
    props: {
        group: String,
        tickets: Array,
    },
    
    setup(props) {
        const store = useStore();

        console.log("@@@@@@@@@@@@@", props.group)
        // Computed property to sort tickets dynamically
        const sortedTickets = computed(() => {
            if (!props.tickets || props.tickets.length === 0) return [];

            if (store.state.sortByOption === 'priority') {
                return [...props.tickets].sort((a, b) => b.priority - a.priority);
            }

            if (store.state.sortByOption === 'title') {
                return [...props.tickets].sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
            }

            // Default to unsorted tickets if no sort option matches
            return props.tickets;
        });

        return { sortedTickets };
    },
};
</script>

<style></style>