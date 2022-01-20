<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <AppointmentForm/>
    <AppointmentCard/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import AppointmentForm from 'components/AppointmentForm.vue';
import AppointmentCard from 'src/components/AppointmentCard.vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    AppointmentForm,
    AppointmentCard
  }
})
</script>
