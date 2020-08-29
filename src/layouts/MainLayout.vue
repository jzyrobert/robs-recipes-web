<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Robs Recipes
        </q-toolbar-title>

        <q-space /> <!-- eat up all the free space -->

        <q-btn
          padding="xs"
          flat
          dense
          @click="$router.push('login')"
        > Login / Register </q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',
  components: { },
  setup() {
    return {}
  }
});
</script>
