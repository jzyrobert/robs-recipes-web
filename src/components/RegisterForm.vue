<template>
  <q-form @submit="onRegister" @reset="onReset">
    <q-input
      filled
      type="email"
      v-model="email"
      label="Your email"
      label-slot
      lazy-rules
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
      v-model="name"
      label="Your name"
      lazy-rules
      :rules="[() => $v.name.required || 'Please enter a name']"
    />

    <q-input
      ref="pwd"
      filled
      @input="$refs.pwdConfirm.validate()"
      :type="isPwd ? 'password' : 'text'"
      v-model="password"
      label="Password"
      lazy-rules
      :rules="[
        () =>
          $v.password.minLength ||
          'Password must be at least 8 characters long!',
        () =>
          passwordRequirementsMet ||
          'Password must match at least 2 requirements!'
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
    <q-input
      filled
      ref="pwdConfirm"
      @input="$refs.pwd.validate()"
      :type="isPwd ? 'password' : 'text'"
      v-model="passwordConfirm"
      label="Password confirmation"
      lazy-rules
      :rules="[pw => pw === password || 'Passwords must match!']"
    >
    </q-input>
    <q-slide-transition>
      <q-list
        v-show="password.length > 0"
        dense
        bordered
        padding
        class="rounded-borders"
      >
        <q-item>
          <q-item-section
            v-bind:class="{ 'text-strike': hasUpperCase(password) }"
          >
            Contains Uppercase and Lowercase letters
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section v-bind:class="{ 'text-strike': hasDigits(password) }">
            Contains numbers
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section
            v-bind:class="{
              'text-strike': hasSpecialCharacters(password)
            }"
          >
            Contains special characters
          </q-item-section>
        </q-item>
      </q-list>
    </q-slide-transition>

    <q-card-actions>
      <q-btn label="Register" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </q-card-actions>
  </q-form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Validate } from 'vuelidate-property-decorators';
import { required, email, minLength } from 'vuelidate/lib/validators';

@Component
export default class RegisterForm extends Vue {
  @Validate({ required, email })
  email = '';
  @Validate({ required })
  name = '';
  @Validate({ required, minLength: minLength(8) })
  password = '';
  @Validate({ required })
  passwordConfirm = '';
  isPwd = true;

  get passwordRequirementsMet() {
    return (
      [
        this.hasUpperCase(this.password),
        this.hasDigits(this.password),
        this.hasSpecialCharacters(this.password)
      ].filter(Boolean).length >= 2
    );
  }

  onRegister() {
    console.log('Register pressed');
  }

  hasSpecialCharacters(value: string) {
    return /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
  }

  hasUpperCase(value: string) {
    return /[A-Z]/.test(value);
  }

  hasDigits(value: string) {
    return /\d/.test(value);
  }

  onReset() {
    this.email = '';
    this.name = '';
    this.password = '';
  }
}
</script>
