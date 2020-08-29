<template>
  <q-page class="items-center justify-evenly">
    <q-card>
        <q-form
            @submit="onLogin"
            @reset="onReset"
            class="q-gutter-md"
        >
            <q-input
                filled
                type="email"
                v-model="email"
                label="Your email"
                label-slot
                lazy-rules
                :rules="[]"
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
                :rules="[ val => val && val.length > 0 || 'Please enter a name' ]"
            />

            <q-input
                filled
                :type="isPwd ? 'password' : 'text'"
                v-model="password"
                label="A password"
                lazy-rules
                :rules="[ () => matchingRules.length >= 2 || 'Your password does not match the requirements' ]"
            >
            <template v-slot:append>
            <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
            />
            </template>
            </q-input>

        <q-separate />

        <q-card-actions>
            <q-btn label="Login" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-card-actions>
        </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex',
  components: { },
  methods: {
      onReset() {
          this.email    = ""
          this.name     = ""
          this.password = ""
      }
  },
  setup() {
    const email = ref("")
    const name = ref("")
    const password = ref("")
    const isPwd = ref(true)
    return { email, name, password, isPwd };
  }
});
</script>
