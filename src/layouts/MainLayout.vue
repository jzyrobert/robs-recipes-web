<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Robs Recipes
        </q-toolbar-title>

        <q-space />
        <!-- eat up all the free space -->

        <q-btn
          v-if="!isLoggedIn"
          padding="xs"
          flat
          dense
          @click="$router.push('login')"
        >
          Login / Register
        </q-btn>

        <q-btn
          v-if="isLoggedIn"
          padding="xs"
          flat
          dense
          @click="$router.push('account')"
        >
          {{ name }}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';

@Component({
  computed: {
    ...mapState('login', ['isLoggedIn', 'name'])
  }
})
export default class MainLayout extends Vue {}
</script>
