<template>
    <q-table title="Your Appointments"
             :rows="formattedAppointments"
             :columns="columns"
             row-key="id">
        <template v-slot:body-cell-actions="props">
            <q-td :props="props">
                <q-btn-dropdown color="primary" label="Actions" size="sm">
                    <q-list>
                        <q-item v-for="(action, i) in generateActions(props.value)"
                                :key="i"
                                clickable
                                v-close-popup
                                @click="action.callback">
                            <q-item-section>
                                <q-item-label>{{ action.label }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </q-td>
        </template>
    </q-table>
</template>

<script>
    import { defineComponent, ref, computed, onMounted } from 'vue';
    import useDatabaseStore from 'src/stores/database';

    export default defineComponent({
        setup() {
            const databaseStore = useDatabaseStore();

            // ------------ DATA ----------------------
            const columns = ref([
                {
                    name: 'id',
                    required: true,
                    label: 'ID',
                    field: row => row.id,
                    sortable: true,
                    align: 'left'
                },
                { name: 'callerId', label: 'Caller ID', field: 'callerId', align: 'center' },
                { name: 'date', label: 'Date', field: 'date', align: 'center' },
                { name: 'status', label: 'Status', field: 'status', align: 'center' },
                { name: 'verificationCode', label: 'Verification Code', field: 'verificationCode', align: 'center' },
                { name: 'postponedDate', label: 'Postponed Date', field: 'postponedDate', align: 'center' },
                { name: 'actions', label: 'Actions', field: row => row, align: 'center' }
            ]);

            // const rows = ref([
            //     {
            //         id: '1',
            //         callerId: '+6597664983',
            //         status: 'pending',
            //         verificationCode: '-',
            //         postponedDate: '-'
            //     },
            //     {
            //         id: '2',
            //         callerId: '+6597664983',
            //         status: 'accepted',
            //         verificationCode: '-',
            //         postponedDate: '-'
            //     },
            //     {
            //         id: '3',
            //         callerId: '+6597664983',
            //         status: 'completed',
            //         verificationCode: '-',
            //         postponedDate: '-'
            //     },
            //     {
            //         id: '4',
            //         callerId: '+6597664983',
            //         status: 'postponed',
            //         verificationCode: '-',
            //         postponedDate: '-'
            //     }
            // ])
            onMounted(() => {
                getAllAppointments();
            });

            const rawAppointments = ref([]);
            const getAllAppointments = async () => {
                let resp;
                try {
                    resp = await databaseStore.getAllAppointments();
                } catch (err) {
                    console.log({err});
                }
                console.log({resp});
                rawAppointments.value = resp.data;
            }
            const formattedAppointments = computed(() => {
                return rawAppointments.value.map(el => {
                    const formattedEl = {...el};
                    if (!formattedEl.verificationCode) {
                        formattedEl.verificationCode = '-';
                    }
                    if (!formattedEl.postponedDate) {
                        formattedEl.postponedDate = "-";
                    }
                    return formattedEl;
                })
            });

            // ------------------ ACTIONS ---------------
            const viewAppointmentDetails = (appointmentId) => {
                console.log('viewing details for', {appointmentId});
            }
            const markAppointmentCompleted = (appointmentId) => {
                console.log('marking completed for', {appointmentId});
            }
            const connectCall = (callerId) => {
                console.log('making a call to:', {callerId});
            }
            const generateActions = (row) => {
                const actions = [
                    {
                        label: 'View Details',
                        callback: () => viewAppointmentDetails(row.id)
                    }
                ];
                if (row.status === 'accepted') {
                    actions.push({
                        label: 'Call Now',
                        callback: () => connectCall(row.callerId)
                    })
                }
                if (!(row.status === 'completed' || row.status === 'postponed')) {
                    actions.push({
                        label: 'Mark As Done',
                        callback: () => markAppointmentCompleted(row.id)
                    })
                }
                return actions;
            }
            return {
                columns,
                // rows,
                generateActions,
                formattedAppointments
            }
        }
    })
</script>