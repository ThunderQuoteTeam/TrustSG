<template>
    <q-card class="appointment-card text-white"
            v-bind="$attrs"
            :key="renderKey"
            :class="appointmentData.isActionable ? 'bg-primary' : appointmentData.isPostponed ? 'bg-warning' : 'bg-secondary'">
        <q-card-section>
            <div class="text-h6">Your Appointment</div>
            <p v-if="appointmentData.isPostponed" class="q-mb-none">This appointment was postponed</p>
            <p v-else-if="!appointmentData.isActionable" class="q-mb-none">This appointment has already been accepted</p>
        </q-card-section>
        <q-card-section>
            <div class="q-mb-md flex no-wrap">
                <q-icon name="event" :size="'sm'"/>
                <p class="q-mb-none q-ml-sm">{{ appointmentData.date }}</p>
            </div>
            <div class="q-mb-md flex no-wrap">
                <q-icon name="timer" :size="'sm'"/>
                <p class="q-mb-none q-ml-sm">{{ appointmentData.duration }}</p>
            </div>
            <div class="flex no-wrap">
                <q-icon name="description" :size="'sm'"/>
                <p class="q-mb-none q-ml-sm">
                    {{ appointmentData.agenda }}
                </p>
            </div>
        </q-card-section>
        <q-separator />
        <q-card-actions>
            <q-btn :disable="!appointmentData.isActionable" flat @click="acceptAppointment" :loading="acceptAppointmentPending">Accept</q-btn>
            <q-btn :disable="!appointmentData.isActionable" flat @click="showPostponeForm">Postpone</q-btn>
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
                <q-btn :disable="!appointmentData.isActionable" flat label="Cancel" v-close-popup />
                <q-btn :disable="!appointmentData.isActionable" flat label="Postpone" @click="sendPostponeRequest" />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="verificationCodeModalVisible" persistent>
        <q-card>
            <q-card-section>
                <div class="text-h6">NOTE: Verification Code</div>
            </q-card-section>
            <q-card-section>
                <div class="text-h4">{{ verificationCode }}</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
                Please ask the public officer to recite the code above when you begin the call.
            </q-card-section>
            <q-card-section class="q-pt-none">
                An SMS containing this code will also be sent to you shortly.
            </q-card-section>
            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" @click="hideVerificationCodeModal" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    import { defineComponent, ref, watch, onMounted } from 'vue';
    import { useQuasar } from 'quasar';
    import DatePicker from './DatePicker.vue';
    import useVerificationStore from 'src/stores/verification';
    import useDatabaseStore from 'src/stores/database';

    export default defineComponent({
        components: {
            DatePicker
        },
        props: {
            appointmentId: Number
        },
        setup(props) {
            const verificationStore = useVerificationStore();
            const databaseStore = useDatabaseStore();
            const $q = useQuasar();

            const appointmentData = ref({
                date: '',
                duration: '',
                agenda: '',
                isActionable: false,
                isPostponed: false
            })
            onMounted(async () => {
                assignData();
            })
            const assignData = async () => {
                const { data } = await databaseStore.getAppointment(props.appointmentId);
                const el = data[0]; // returns an array (of 1 ele)
                appointmentData.value.date = el.date;
                appointmentData.value.duration = `${el.duration} mins`;
                appointmentData.value.agenda = el.agenda;
                appointmentData.value.isActionable = el.status === 'pending';
                appointmentData.value.isPostponed = !!el.postponedDate;
            }

            const postponeFormVisible = ref(false);
            const showPostponeForm = () => {
                postponeFormVisible.value = true;
            }
            const hidePostponeForm = () => {
                postponeFormVisible.value = false;
            }
            const postponedDateString = ref(null);
            const sendPostponeRequest = async() => {
                console.log(postponedDateString.value, props.appointmentId);
                const updatedAppointment = {
                    id: props.appointmentId,
                    postponedDate: postponedDateString.value,
                    status: "postponed"
                }
                await databaseStore.updateAppointment(updatedAppointment);
                hidePostponeForm();
                await assignData();
                renderKey.value += 1;
            }

            const verificationCode = ref('');
            const verificationCodeModalVisible = ref(false);
            const showVerificationCodeModal = () => {
                verificationCodeModalVisible.value = true;
            }
            const hideVerificationCodeModal = async () => {
                verificationCodeModalVisible.value = false;
                await assignData();
                renderKey.value += 1;
            }
            const acceptAppointmentPending = ref(false);
            const acceptAppointment = async() => {
                acceptAppointmentPending.value = true;
                let resp;
                try {
                    resp = await verificationStore.createVerificationCode(props.appointmentId);
                } catch (err) {
                    console.log({err});
                    acceptAppointmentPending.value = false;
                    $q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'warning',
                        message: 'Failed to confirm appointment. Please try again.',
                        position: 'top'
                    })
                    return;
                }
                const { otp } = resp.data;
                console.log({otp});
                verificationCode.value = otp;
                acceptAppointmentPending.value = false;
                showVerificationCodeModal();
            }

            const renderKey = ref(0);
            return {
                postponeFormVisible,
                showPostponeForm,
                hidePostponeForm,
                verificationCode,
                verificationCodeModalVisible,
                showVerificationCodeModal,
                hideVerificationCodeModal,
                postponedDateString,
                sendPostponeRequest,
                acceptAppointmentPending,
                acceptAppointment,
                appointmentData,
                renderKey
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