<template>
  <div class="container">
    <h2>Add dogs</h2>

    <b-form @submit="onSubmit" @submit.stop.prevent>
      <!-- Name -->
      <b-form-group
        id="input-group-1"
        label="Name:"
        label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <!-- Image -->
      <FileUpload />

      <!-- color -->
      <b-form-group
        id="input-group-3"
        label="Color:"
        label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.color"
          type="text"
          required
          placeholder="Enter color"
        ></b-form-input>
      </b-form-group>

      <!-- birthday -->
      <b-form-group
        id="input-group-4"
        label="Birthday:"
        label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.birthday"
          type="text"
          required
          placeholder="Enter birthday"
        ></b-form-input>
      </b-form-group>

      <!-- sex -->
      <b-form-group
        id="input-group-5"
        label="Sex:"
        label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.sex"
          type="text"
          required
          placeholder="Enter sex"
        ></b-form-input>
      </b-form-group>

      <!-- Description -->
      <b-form-group
        id="input-group-6"
        label="Description:"
        label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="form.description"
          type="text"
          required
          placeholder="Enter description"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>

    </b-form>

  </div>
</template>

<script>
import FileUpload from './../../../components/FileUpload';

export default {
  layout: 'admin',
  data() {
    return {
      form: {
        name: '',
        image: [],
        color: '',
        birthday: '',
        sex: '',
        description: '',
      }
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      try {
        // this.$notifier.showMessage({ message: 'You successful logged in!', type: 'info' })
      } catch (e) {
        console.log(e)
      }

    },
  }
}
</script>
