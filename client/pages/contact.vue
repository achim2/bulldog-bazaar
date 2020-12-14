<template>
  <div class="contact">
    <PageTitle :title="$t('contact')"
               :text="$t('contact subtitle')"/>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <b-form @submit="onSubmit" @submit.stop.prevent>
            <b-form-group
              id="input-group-1"
              label="Email"
              label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              :label="$t('name')"
              label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.name"
                type="text"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              :label="$t('message')"
              label-for="input-3">
              <b-form-textarea
                id="input-2"
                v-model="form.message"
                type="text"
              ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary" class="w-100">{{ $t('submit') }}</b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';

export default {
  components: { PageTitle },
  data() {
    return {
      form: {
        email: '',
        name: '',
        message: '',
      }
    };
  },
  methods: {
    onSubmit() {
      //send email
      console.log(this.form);
    },
  }
};
</script>

<style lang="scss">
</style>
