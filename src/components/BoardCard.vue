<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'BoardCard',
    props: {
        ticket: Object,
    },
    setup(props) {
        const ticketData = ref(props.ticket);

        return { ticketData };
    },
});
</script>
<template>
    <div class="card-container">
        <div className="card-id-wrapper">
            <div className="card-id">
                {{ ticketData.id }}
            </div>
            <div className="card-profile">
                <div className="card-profile-initial">
                    <!-- {{ ticketData.name[0] }} {{ ticketData.name[1] }} -->
                </div>
                <div
                    :class="['card-profile-initial-available', { 'card-profile-initial-available card-profile-initial-available-true': ticketData.avaialbe }]">
                </div>
            </div>
        </div>
        <div class="d-flex">
            <div class="card-status">
                <div class="" v-if="ticketData.status === `Todo`">
                    <img src="../assets/img/To-do.svg" />
                </div>
                <div class="" v-if="ticketData.status === `In progress`">
                    <img src="../assets/img/in-progress.svg" />
                </div>
                <div class="" v-if="ticketData.status === `Backlog`">
                    <img src="../assets/img/Backlog.svg" />
                </div>
            </div>
            <div class="card-title">
                {{ ticketData.title }}
            </div>
        </div>
        <div class="card-tag">
            <div v-for="tags in ticketData.tag" v-bind:key="tags.id">
                <div class="d-flex">
                    <div class="priority" v-if="ticketData.priority === 4">
                        <img src="../assets/img/SVG - Urgent Priority grey.svg" />
                    </div>
                    <div class="priority" v-if="ticketData.priority === 3">
                        <img src="../assets/img/Img - High Priority.svg" />
                    </div>
                    <div class="priority" v-if="ticketData.priority === 2">
                        <img src="../assets/img/Img - Medium Priority.svg" />
                    </div>
                    <div class="priority" v-if="ticketData.priority === 1">
                        <img src="../assets/img/Img - Low Priority.svg" />
                    </div>
                    <div class="priority" v-if="ticketData.priority === 0">
                        <img src="../assets/img/No-priority.svg" />
                    </div>
                    <div class="card-tag-box">
                        <div class="card-tag-title">{{ tags }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style></style>