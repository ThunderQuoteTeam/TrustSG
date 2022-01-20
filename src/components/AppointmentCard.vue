<template>
    <q-card class="appointment-card bg-primary text-white" v-bind="$attrs">
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
    <q-dialog v-model="postponeFormVisible" persistent>
        <q-card style="min-width: 350px;">
            <q-card-section>
                <div class="text-h6">Postpone Call</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
                <DatePicker v-model:parentDateString="postponedDateString" :isFilledStyle="false" label="New Date and Time"/>
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn flat label="Postpone" @click="sendPostponeRequest" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    import { defineComponent, ref, watch } from 'vue';
    import DatePicker from './DatePicker.vue';

    export default defineComponent({
        components: {
            DatePicker
        },
        props: {
            appointmentId: Number
        },
        setup(props) {
            const postponeFormVisible = ref(false);
            const showPostponeForm = () => {
                console.log('current appointment id', props.appointmentId);
                postponeFormVisible.value = true;
            }
            const hidePostponeForm = () => {
                postponeFormVisible.value = false;
            }

            const postponedDateString = ref(null);
            const sendPostponeRequest = () => {
                console.log(postponedDateString.value);
                hidePostponeForm();
            }

            return {
                postponeFormVisible,
                showPostponeForm,
                hidePostponeForm,
                postponedDateString,
                sendPostponeRequest
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