<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-8 col-lg-6">
        <h2>Login</h2>
        <b-form @submit="onSubmit" @submit.stop.prevent>
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Password:"
            label-for="text-password">
            <b-form-input
              id="input-3"
              v-model="form.password"
              type="password"
              required
              placeholder="Enter password"
              aria-describedby="password-help-block"
            ></b-form-input>

            <b-form-text id="password-help-block">
              Your password must be 8-20 characters long, contain letters and numbers, and must not
              contain spaces, special characters, or emoji.
            </b-form-text>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        email: 'ahimjuhasz@gmail.com',
        password: 'dummy',
      }
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      try {
        await this.$auth.loginWith('local', { data: { ...this.form } });
        this.$notifier.showMessage({ message: 'You successful logged in!', type: 'info' })
      } catch (e) {
        console.log(e)
      }

    },
  }
}
</script>
