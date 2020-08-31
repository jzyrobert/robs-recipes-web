<template>
  <q-page class="column full-width justify-center">
    <q-card
      style="
        min-width: 40vw;
      "
      class="column col-md-6 col-xs-grow"
    >
      <q-tab-panels v-model="tab" animated class="col-grow">
        <q-tab-panel name="login">
          <LoginForm />
        </q-tab-panel>

        <q-tab-panel name="register">
          <RegisterForm />
        </q-tab-panel>
      </q-tab-panels>

      <q-separator />

      <q-tabs v-model="tab" class="text-teal col-1">
        <q-tab label="Login" name="login" />
        <q-tab label="Register" name="register" />
      </q-tabs>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import RegisterForm from '../components/RegisterForm.vue';
import LoginForm from '../components/LoginForm.vue';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';

@Component({
  components: {
    LoginForm,
    RegisterForm
  },
  computed: {
    ...mapState('login', ['isLoggedIn', 'name'])
  }
})
export default class LoginPage extends Vue {
  isLoggedIn!: boolean;
  $router!: VueRouter;
  tab = 'login';

  created() {
    if (this.isLoggedIn) {
      void this.$router.push('/');
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .q-page {
    align-items: stretch;
  }
}

@media only screen and (min-width: 768px) {
  .q-page {
    align-items: center;
  }
}
</style>
