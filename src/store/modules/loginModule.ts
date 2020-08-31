import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import axios, { AxiosError } from 'axios';

export interface LoginResponse {
  name: string;
  email: string;
  token: string;
}

@Module({ namespaced: true })
export default class LoginModule extends VuexModule {
  name = '';
  email = '';
  token = '';
  isLoggedIn = false;

  @Mutation
  commitLogin({
    name,
    email,
    token
  }: {
    name: string;
    email: string;
    token: string;
  }) {
    this.name = name;
    this.email = email;
    this.token = token;
    this.isLoggedIn = true;
  }

  @Action
  attemptLogin({ email, password }: { email: string; password: string }) {
    console.log('Sending ' + email + ' and ' + password);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    axios
      .post(process.env.API_URL + '/login', {
        email,
        password
      })
      .then(res => {
        const data = res.data as LoginResponse;
        console.log(data);
        this.context.commit('commitLogin', {
          name: data.name,
          email: data.email,
          token: data.token
        });
      })
      .catch(function(err: AxiosError) {
        console.log("We're here");
        console.log(err);
        if (err.response && err.response.data) {
          console.log(err.response.data);
        }
      });
  }
}
