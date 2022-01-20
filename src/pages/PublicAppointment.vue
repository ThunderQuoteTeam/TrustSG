<template>
    <q-page class="flex flex-center">
        <AppointmentCard :appointmentId="appointmentId"/>
    </q-page>
</template>

<script>
    import { defineComponent, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import AppointmentCard from 'src/components/AppointmentCard.vue';

    export default defineComponent({
        components: {
            AppointmentCard
        },
        setup() {
            const route = useRoute();
            const appointmentId = computed(() => route.params.appointmentId);

            return {
                appointmentId
            }
        }
    })
</script>