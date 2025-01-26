// store/index.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import fetchData from '../utils/api';

export default createStore({
    state: {
        tickets: [],
        groupByOption: 'status', // Default grouping option
        sortByOption: 'priority', // Default sorting option
        users: [],
    },
    mutations: {
        setTickets(state, tickets) {
            state.tickets = tickets;
        },
        setGroupBy(state, groupByOption) {
            state.groupByOption = groupByOption;
        },
        setSortBy(state, sortByOption) {
            state.sortByOption = sortByOption;
        },
        setUsers(state, users) {
            state.users = users;
        },
    },
    actions: {
        async fetchTickets({commit}) {
            try {
                const tickets = await fetchData(); // Fetch tickets using the utility
                commit('setTickets', tickets.tickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        },
        updateGroupBy({ commit }, groupByOption) {
            commit('setGroupBy', groupByOption);
        },
        updateSortBy({ commit }, sortByOption) {
            commit('setSortBy', sortByOption);
        },
        async fetchUsers({commit}) {
            try {
                const tickets = await fetchData(); // Fetch tickets using the utility
                commit('setUsers', tickets.users);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        },
    },
    plugins: [createPersistedState()], // Persist state in localStorage
});
