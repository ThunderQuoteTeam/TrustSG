<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
    <AppointmentForm/>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AppointmentForm from 'components/AppointmentForm.vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    AppointmentForm,
  }
})
</script>
