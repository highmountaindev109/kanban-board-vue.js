<template>
    <div class="board-container">
        <BoardNavbar :groupByOption="groupBy" :sortByOption="sortBy" />
        <section class="board-details">
            <div class="board-details-list">
                <div v-if="groups.length" class="list-row-container">
                    <BoardList v-for="group in groups" :key="group" :group="group"
                        :tickets="getTicketsByGroup(group)" />
                </div>
                <div v-else class="no-tickets">
                    <p>No tickets available.</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { computed, onMounted, defineComponent } from 'vue';
import { useStore } from 'vuex';
import BoardNavbar from './BoardNavbar.vue';
import BoardList from './BoardList.vue';

export default defineComponent({
    name: 'BoardMainPage',
    components: { BoardNavbar, BoardList },
    setup() {
        const store = useStore();

        // Ensure tickets is always an array
        const tickets = computed(() => store.state.tickets || []);
        const users = computed(() => store.state.users || []);

        console.log("4444444444", tickets.value.map((ticket) => ticket.status))
        
        const groups = computed(() => {
            if (!Array.isArray(tickets.value)) return [];
            if (store.state.groupByOption === 'status') {
                return [...new Set(tickets.value.map((ticket) => ticket.status))];
            }
            if (store.state.groupByOption === 'user') {
                return [...new Set(tickets.value.map((ticket) => getUserNameById(ticket.userId)))];
            }
            return [...new Set(tickets.value.map((ticket) => ticket.priority))];
        });

        const getTicketsByGroup = (group) => {
            if (!Array.isArray(tickets.value)) return [];
            if (store.state.groupByOption === 'status') {
                return tickets.value.filter((ticket) => ticket.status === group);
            }
            if (store.state.groupByOption === 'user') {
                return tickets.value.filter((ticket) => getUserNameById(ticket.userId) === group);
            }
            return tickets.value.filter((ticket) => ticket.priority === group);
        };

        const getUserNameById = (userId) => {
            console.log("userId", userId)
            const user = users.value.find((user) => user.id === userId);
            return user ? user.name : 'Unknown User';
        };

        const groupBy = computed(() => store.state.groupByOption);
        const sortBy = computed(() => store.state.sortByOption);

        onMounted(() => {
            if (!store.state.tickets || store.state.tickets.length === 0) {
                store.dispatch('fetchTickets');
                console.log("22222", store.state.tickets)
            }
            if (!store.state.users || store.state.users.length === 0) {
                store.dispatch('fetchUsers');
                console.log('33333333', store.state.users)
            }
        });

        return { tickets, users, groups, groupBy, sortBy, getUserNameById, getTicketsByGroup };
    },
});
</script>

<style>
/* Add your styles here */
</style>
