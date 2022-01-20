<template>
    <q-card class="appointment-card bg-primary text-white">
        <q-card-section>
            <div class="text-h6">Your Appointment</div>
        </q-card-section>
        <q-card-section>
            <div class="q-mb-md flex no-wrap">
                <q-icon name="event" :size="'sm'"/>
                <p class="q-mb-none q-ml-sm">DATETIME</p>
            </div>
            <div class="q-mb-md flex no-wrap">
                <q-icon name="timer" :size="'sm'"/>
                <p class="q-mb-none q-ml-sm">DURATION</p>
            </div>
            <div class="flex no-wrap">
                <q-icon name="description" :size="'sm'"/>
                <p class="q-mb-none q-ml-sm">
                    Agenda: AGENDA Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem maxime tempora consectetur quas magnam debitis nisi accusantium dolore, consequuntur harum soluta possimus. Sit accusamus ipsum numquam vero eligendi ratione earum?
                </p>
            </div>
        </q-card-section>
        <q-separator />
        <q-card-actions>
            <q-btn flat>Accept</q-btn>
            <q-btn flat @click="showPostponeForm">Postpone</q-btn>
        </q-card-actions>
    </q-card>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            appointmentId: String
        },
        emits: ['showPostponeForm'],
        setup(props, {emit}) {
            const showPostponeForm = () => {
                emit('showPostponeForm', props.appointmentId);
            }
            return {
                showPostponeForm
            }
        }
    })
</script>

<style lang="scss">
    .appointment-card {
        min-width: 60%;
        max-width: 80%;
    }
</style>