<template>
  <div class="contact">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2>Contact me!</h2>
          <b-form @submit="onSubmit" @submit.stop.prevent>
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Name:"
              label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.name"
                type="text"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Message:"
              label-for="input-3">
              <b-form-input
                id="input-2"
                v-model="form.message"
                type="text"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        message: '',
      }
    }
  },
  methods: {
    onSubmit() {
      //send email
      console.log(this.form);
    },
  }
}
</script>

<style lang="scss">
</style>
