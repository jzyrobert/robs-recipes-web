<template>
  <q-form @submit="onLogin" @reset="onReset">
    <q-input
      filled
      type="email"
      v-model="email"
      label="Your email"
      label-slot
      :rules="[
        () => $v.email.required || 'Please enter a email',
        () => $v.email.email || 'This is not a valid email!'
      ]"
    >
      <template v-slot:label>
        <div class="row items-center all-pointer-events">
          <q-icon class="q-mr-xs" color="deep-orange" size="24px" name="mail" />
          Email
        </div>
      </template>
    </q-input>

    <q-input
      filled
      :type="isPwd ? 'password' : 'text'"
      v-model="password"
      label="Your password"
      :rules="[
        password =>
          (password && password.length > 0) || 'Please enter your password!'
      ]"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-card-actions>
      <q-btn label="Login" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </q-card-actions>
  </q-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Validate } from 'vuelidate-property-decorators';
import { required, email } from 'vuelidate/lib/validators';

@Component
export default class LoginForm extends Vue {
  @Validate({ required, email })
  email = '';

  @Validate({ required })
  password = '';

  isPwd = true;

  onLogin() {
    console.log('Login pressed');
  }

  onReset() {
    this.email = '';
    this.password = '';
  }
}
</script>
