<template>
    <q-page class="flex flex-center">
        <AppointmentTable/>
    </q-page>
</template>

<script>
    import { defineComponent } from 'vue';
    import AppointmentTable from 'src/components/AppointmentTable.vue';

    export default defineComponent({
        name: "AdminAppointments",
        components: {
            AppointmentTable
        }
    })
</script>