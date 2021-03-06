<template>
    <div class="q-pa-md" style="max-width: 400px">
        <h5>Make An Appointment</h5>
        <q-form @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md">
            <!-- <q-input
                filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
            /> -->

            <vue3-q-tel-input filled
                              defaultCountry="sg"
                              v-model:tel="appointmentNumber"
                              :required="true"
                              @error="phoneError"
                              label="Phone Number"
                              hide-bottom-space/>

            <!-- <q-input filled v-model="appointmentDate" label="Appointment Date">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer q-mr-sm">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="appointmentDate" mask="YYYY-MM-DD HH:mm">
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                    <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="appointmentDate" mask="YYYY-MM-DD HH:mm" format24h>
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                            </q-time>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input> -->

            <DatePicker v-model:parentDateString="appointmentDate" label="Appointment Date"/>

            <q-input
                filled
                type="number"
                v-model="appointmentDuration"
                label="Approx Duration (mins) *"
                lazy-rules
                :rules="[val => val !== null && val !== '' || 'Please enter a number']"
                hide-bottom-space
            />

            <q-input v-model="appointmentAgency" type="text" label="Agency (e.g. MOH)" filled/>
            <q-input v-model="appointmentAgenda" type="textarea" label="Agenda" filled/>

            <div>
                <q-btn label="Submit" type="submit" color="primary" :loading="submitPending"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>

    </div>
</template>

<script>
    import { v4 as uuidv4 } from 'uuid';
    import { useQuasar } from 'quasar'
    import { ref, watch } from 'vue'
    import Vue3QTelInput from 'vue3-q-tel-input'
    import 'vue3-q-tel-input/dist/vue3-q-tel-input.esm.css'
    import useTwilioStore from '../stores/twilio';
    import useDatabaseStore from 'src/stores/database';
    import DatePicker from './DatePicker.vue';

    export default {
        components: {
            Vue3QTelInput,
            DatePicker
        },
        setup () {
            const $q = useQuasar();
            const databaseStore = useDatabaseStore();

            const DEFAULT_STATES = {
                appointmentNumber: '',
                appointmentAgenda: '',
                appointmentDate: null,
                appointmentDuration: 0,
                appointmentAgency: ''
            }

            // const name = ref(null);
            const appointmentAgency = ref(DEFAULT_STATES.appointmentAgency);
            const appointmentDuration = ref(DEFAULT_STATES.appointmentDuration);
            const appointmentNumber = ref(DEFAULT_STATES.appointmentNumber)
            const appointmentAgenda = ref(DEFAULT_STATES.appointmentAgenda);
            const appointmentDate = ref(DEFAULT_STATES.appointmentDate); // form input will give date STRING
            const phoneError = ref(false);
            const submitPending = ref(false);

            watch(appointmentDate, () => {
                console.log(appointmentDate.value, new Date(appointmentDate.value));
            })

            const onSubmit = async () => {
                submitPending.value = true;
                let resp;
                // create appointment in cosmos db, if this fails, dont do any messaging
                const id = uuidv4();
                const newAppointment = {
                    id,
                    callerId: appointmentNumber.value,
                    duration: appointmentDuration.value,
                    date: appointmentDate.value,
                    agenda: appointmentAgenda.value,
                    status: "pending",
                    verificationCode: "",
                    postponedDate: ""
                }
                try {
                    resp = await databaseStore.createAppointment(newAppointment);
                } catch (err) {
                    console.log({err});
                    $q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'warning',
                        message: 'Failed to create appointment in the database',
                        position: 'top'
                    });
                    submitPending.value = false;
                    return
                }

                try {
                    resp = await twilioStore.sendAppointmentMessage(id, appointmentNumber.value, appointmentAgenda.value, appointmentDate.value, appointmentDuration.value, appointmentAgency.value);
                    console.log({resp});
                    $q.notify({
                        color: 'green-4',
                        textColor: 'white',
                        icon: 'cloud_done',
                        message: 'Submitted',
                        position: 'top'
                    });
                    onReset(); // if successful, reset form
                } catch (err) {
                    console.log({err});
                    $q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'warning',
                        message: 'Failed to send message',
                        position: 'top'
                    })
                }

                submitPending.value = false;
            }

            const onReset = () => {
                appointmentNumber.value = DEFAULT_STATES.appointmentNumber;
                appointmentAgenda.value = DEFAULT_STATES.appointmentAgenda;
                appointmentDuration.value = DEFAULT_STATES.appointmentDuration;
                appointmentDate.value = DEFAULT_STATES.appointmentDate;
                appointmentAgency.value = DEFAULT_STATES.appointmentAgency;
            }

            const twilioStore = useTwilioStore();

            return {
                appointmentNumber,
                appointmentDuration,
                appointmentAgenda,
                appointmentDate,
                appointmentAgency,
                phoneError,
                submitPending,
                onSubmit,
                onReset,
                twilioStore
            }
        }
    }
</script>