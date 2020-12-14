<template>
  <div class="container">
    <h2>Page info</h2>

    <b-form @submit="onSubmit"
            @submit.stop.prevent>

      <b-form-group
        id="input-group-1"
        label="Contact email:"
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
        id="input-group-2"
        label="Contact phone:"
        label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.phone"
          type="text"
          required
          placeholder="Enter phone"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Facebook url:"
        label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.fbUrl"
          type="text"
          required
          placeholder="Enter facebook url"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Instagram url:"
        label-for="input-4">
        <b-form-input
          id="input-"
          v-model="form.instaUrl"
          type="text"
          required
          placeholder="Enter instagram url"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" v-on:click.prevent="onSubmit">Save</b-button>

    </b-form>
  </div>
</template>

<script>

export default {
  layout: 'admin',
  data() {
    return {
      form: {
        email: '',
        phone: '',
        fbUrl: '',
        instaUrl: '',
      }
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$axios.$get('/info')
        .then(res => {
          if (res) {
            this.form = res;
          }
        })
    },
    onSubmit() {
      this.$axios.$post('admin/info', {
        userId: this.$auth.$state.user.id,
        ...this.form
      })
        .then(res => {
          this.form = res.info;
          this.$notifier.showMessage({ message: [res.message], type: 'success' });
        });
    }
  },
};
</script>
