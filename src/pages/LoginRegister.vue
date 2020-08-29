<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="col-6">
      <q-tabs v-model="tab" class="text-teal">
        <q-tab label="Login" name="login" />
        <q-tab label="Register" name="register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <q-form @submit="onLogin" @reset="onReset" class="q-gutter-md">
            <q-form @submit="onRegister" @reset="onReset" class="q-gutter-md">
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
                    <q-icon
                      class="q-mr-xs"
                      color="deep-orange"
                      size="24px"
                      name="mail"
                    />
                    Email
                  </div>
                </template>
              </q-input>

              <q-input
                filled
                :type="isPwd ? 'password' : 'text'"
                v-model="password"
                label="A password"
                lazy-rules
                :rules="[
                  () =>
                    (password && password.length > 0) ||
                    'Please enter your password!'
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
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </q-card-actions>
            </q-form>
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="register">
          <q-form @submit="onRegister" @reset="onReset" class="q-gutter-md">
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
                  <q-icon
                    class="q-mr-xs"
                    color="deep-orange"
                    size="24px"
                    name="mail"
                  />
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
              filled
              :type="isPwd ? 'password' : 'text'"
              v-model="password"
              label="A password"
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
              :type="isPwd ? 'password' : 'text'"
              v-model="passwordConfirm"
              label="Password confirmation"
              lazy-rules
              :rules="[
                pw =>
                  pw === password ||
                  'Passwords must match!'
              ]"
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
                  <q-item-section
                    v-bind:class="{ 'text-strike': hasDigits(password) }"
                  >
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
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </q-card-actions>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';

@Component({
  mixins: [validationMixin],
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  }
})
export default class LoginPage extends Vue {
  email = '';
  name = '';
  password = '';
  passwordConfirm = '';
  isPwd = true;
  tab = 'login';

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

  onLogin() {
    console.log('Login pressed')
  }

  onReset() {
    this.email = '';
    this.name = '';
    this.password = '';
  }

  hasSpecialCharacters(value: string) {
    return /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
  }

  hasUpperCase(value: string) {
    return /[A-Z]/.test(value);
  }

  hasDigits(value: string) {
    return /\d/.test(value);
  }
}
</script>
