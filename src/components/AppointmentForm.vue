<template>
    <div class="q-pa-md" style="max-width: 400px">
        <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        >
            <!-- <q-input
                filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
            /> -->

            <!-- <q-input
                filled
                type="number"
                v-model="age"
                label="Your age *"
                lazy-rules
                :rules="[
                val => val !== null && val !== '' || 'Please type your age',
                val => val > 0 && val < 100 || 'Please type a real age'
                ]"
            /> -->
            <vue3-q-tel-input filled
                              defaultCountry="sg"
                              v-model:tel="appointmentNumber"
                              :required="true"
                              @error="phoneError"
                              label="Phone Number"/>

            <q-input filled v-model="appointmentDate" label="Appointment Date">
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
            </q-input>

            <q-input v-model="appointmentAgenda" type="textarea" label="Agenda" filled/>

            <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>

    </div>
</template>

<script>
    import { useQuasar } from 'quasar'
    import { ref, watch } from 'vue'
    import Vue3QTelInput from 'vue3-q-tel-input'
    import 'vue3-q-tel-input/dist/vue3-q-tel-input.esm.css'
    import useTwilioStore from '../stores/twilio';

    export default {
        components: {
            Vue3QTelInput
        },
        setup () {
            const $q = useQuasar();

            const DEFAULT_STATES = {
                appointmentNumber: '',
                appointmentAgenda: '',
                appointmentDate: null
            }

            // const name = ref(null);
            // const age = ref(null);
            const appointmentNumber = ref(DEFAULT_STATES.appointmentNumber)
            const appointmentAgenda = ref(DEFAULT_STATES.appointmentAgenda);
            const appointmentDate = ref(DEFAULT_STATES.appointmentDate);
            const phoneError = ref(false);

            watch(appointmentNumber, () => {
                console.log(appointmentNumber.value);
            })

            const onSubmit = () => {
                $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: 'Submitted'
                });
                twilioStore.sendAppointmentMessage();
                // if (accept.value !== true) {
                //     $q.notify({
                //         color: 'red-5',
                //         textColor: 'white',
                //         icon: 'warning',
                //         message: 'You need to accept the license and terms first'
                //     })
                // }
                // else {
                //     $q.notify({
                //         color: 'green-4',
                //         textColor: 'white',
                //         icon: 'cloud_done',
                //         message: 'Submitted'
                //     })
                // }
            }

            const onReset = () => {
                appointmentNumber.value = DEFAULT_STATES.appointmentNumber;
                appointmentAgenda.value = DEFAULT_STATES.appointmentAgenda;
                appointmentDate.value = DEFAULT_STATES.appointmentDate;
            }

            const twilioStore = useTwilioStore();

            return {
                appointmentNumber,
                appointmentAgenda,
                appointmentDate,
                phoneError,
                onSubmit,
                onReset,
                twilioStore
            }
        }
    }
</script>