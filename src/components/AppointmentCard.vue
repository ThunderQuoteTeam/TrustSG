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
            <q-btn flat @click="acceptAppointment">Accept</q-btn>
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
    <q-dialog v-model="verificationCodeVisible" persistent>
        <q-card>
            <q-card-section>
                <div class="text-h6">NOTE: Verification Code</div>
            </q-card-section>
            <q-card-section>
                <div class="text-h4">12345678</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
                Please ask the public officer to recite the code above when you begin the call.
            </q-card-section>
            <q-card-section class="q-pt-none">
                An SMS containing this code will also be sent to you shortly.
            </q-card-section>
            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    import { defineComponent, ref, watch } from 'vue';
    import DatePicker from './DatePicker.vue';
    import useVerificationStore from 'src/stores/verification';

    export default defineComponent({
        components: {
            DatePicker
        },
        props: {
            appointmentId: Number
        },
        setup(props) {
            const verificationStore = useVerificationStore();

            const postponeFormVisible = ref(false);
            const showPostponeForm = () => {
                postponeFormVisible.value = true;
            }
            const hidePostponeForm = () => {
                postponeFormVisible.value = false;
            }
            const verificationCodeVisible = ref(false);
            const showVerificationCode = () => {
                verificationCodeVisible.value = true;
            }
            const hideVerificationCode = () => {
                verificationCodeVisible.value = false;
            }

            const postponedDateString = ref(null);
            const sendPostponeRequest = () => {
                console.log(postponedDateString.value, props.appointmentId);
                hidePostponeForm();
            }

            const acceptAppointment = async() => {
                let resp;
                try {
                    resp = await verificationStore.createVerificationCode();
                    console.log({resp});
                } catch (err) {
                    console.log({err});
                    return;
                }
                const { otp } = resp.data;
                console.log({otp});
                showVerificationCode();
            }

            return {
                postponeFormVisible,
                showPostponeForm,
                hidePostponeForm,
                verificationCodeVisible,
                showVerificationCode,
                hideVerificationCode,
                postponedDateString,
                sendPostponeRequest,
                acceptAppointment
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