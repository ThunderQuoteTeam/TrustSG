<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <!-- <q-toolbar-title>TrustSG</q-toolbar-title> -->
        <q-btn flat label="TrustSG" @click="returnHome" icon-right="img:digital-tq-compass.png" size="lg"/>
        <q-space/>
        <q-btn label="Login" @click="login" color="secondary"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>

        <!-- <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        /> -->
        <q-item
          clickable
          tag="a"
          target="_blank"
          v-for="link in essentialLinks"
          :key="link.title"
          @click="router.push(link.path)"
        >
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>
              {{ link.caption }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Appointment Form',
    caption: 'Create an Appointment Form',
    path: "/"
  },
  {
    title: 'Appointments',
    caption: 'View appointments',
    path: "/appointments"
  }
];

import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import useAuthenticationStore from 'src/stores/authentication';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const authStore = useAuthenticationStore();

    const returnHome = () => {
      router.push('/');
    }

    const login = async () => {
      window.location.replace(authStore.loginUrl);
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      returnHome,
      login,
      router
    }
  }
})
</script>
