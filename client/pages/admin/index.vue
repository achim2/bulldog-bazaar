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
        id="input-group-1"
        label="Contact phone:"
        label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.phone"
          type="text"
          required
          placeholder="Enter phone"
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
      }
    }
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
        .catch(err => console.log(err))
    },
    onSubmit() {
      this.$axios.$post('admin/info', {
        userId: this.$auth.$state.user.id,
        ...this.form
      })
        .then(res => {
          this.form = res.info;
          this.$notifier.showMessage({ message: [res.message], type: 'success' });
        })
        .catch(err => {
          const errors = err.response.data.errors;
          const msg = err.response.data.message;

          if (errors) {
            this.$notifier.showMessage({ message: errors.map(obj => obj.msg), type: 'danger' })
          } else {
            this.$notifier.showMessage({ message: [msg], type: 'danger' })
          }
        })
    }
  },
}
</script>
