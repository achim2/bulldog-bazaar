<template>
  <section class="login">
    <PageTitle :title="$t('login')"/>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-10 col-md-8 col-lg-6">
          <b-form @submit="onSubmit" @submit.stop.prevent>
            <b-form-group
              id="input-group-1"
              label="Email"
              label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              :label="$t('password')"
              label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                required
                aria-describedby="password-help-block"
              ></b-form-input>

              <b-form-text id="password-help-block">{{$t('password help')}}</b-form-text>
            </b-form-group>

            <b-button type="submit" variant="primary">{{ $t('submit') }}</b-button>
          </b-form>

        </div>
      </div>
    </div>
  </section>
</template>

<script>

import PageTitle from '../components/PageTitle';

export default {
  components: { PageTitle },
  data() {
    return {
      form: {
        email: '',
        password: '',
      }
    };
  },
  // TODO: rewrite this
  beforeMount() {
    if (this.$auth.$state.loggedIn) {
      this.$router.push(this.localePath({ name: 'admin-products' }));
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      try {
        await this.$auth.loginWith('local', { data: { ...this.form } });
        this.form = {
          email: '',
          password: '',
        };
        // this.$notifier.showMessage({ message: ['You successful logged in!'], type: 'success' })
        // this.$router.push(this.localePath({ name: 'admin-products' }));
      } catch (e) {
      }

    },
  }
};
</script>
