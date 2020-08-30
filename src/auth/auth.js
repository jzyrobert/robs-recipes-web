/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Vue from 'vue';
import auth from '@websanova/vue-auth';
import authBasic from '@websanova/vue-auth/dist/drivers/auth/basic.esm.js';
import httpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x';
import routerVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js';

Vue.use(auth, {
  auth: authBasic,
  http: httpAxios,
  router: routerVueRouter
});
