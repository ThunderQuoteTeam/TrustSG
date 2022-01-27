<template>
  <q-page class="flex flex-center">
    <AppointmentForm/>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import AppointmentForm from 'components/AppointmentForm.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'PageIndex',
  components: {
    AppointmentForm,
  },
  setup() {
    const route = useRoute();
    onMounted(() => {
      const jwt = route.query.code;
      if (jwt) {
        console.log('received jwt code');
      } else {
        console.log('no jwt code');
      }
    });
  }
})
</script>
