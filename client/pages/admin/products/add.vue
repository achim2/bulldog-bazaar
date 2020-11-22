<template>
  <div class="container">
    <h2>Add product</h2>

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

      <b-form-group
        id="input-group-7"
        label="Choose images:"
        label-for="input-7">
        <!--        <b-form-file-->
        <!--          multiple-->
        <!--          v-model="form.images"-->
        <!--          :state="Boolean(form.images)"-->
        <!--          placeholder="Choose a file or drop it here..."-->
        <!--          drop-placeholder="Drop file here..."-->
        <!--        ></b-form-file>-->
        <!--        <div class="mt-3">Selected file: {{ form.images ? form.images : '' }}</div>-->

        <b-form-file
          v-model="form.image"
          :state="Boolean(form.image)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ form.image ? form.image.name : '' }}</div>

      </b-form-group>

      <b-button type="submit" variant="primary" v-on:click.prevent="onSubmit">Submit</b-button>
      <b-button variant="secondary" v-on:click="() => this.$router.go(-1)">Back</b-button>

    </b-form>

  </div>
</template>

<script>

export default {
  layout: 'admin',
  data() {
    return {
      isEditing: false,
      id: null,
      form: {
        name: '',
        color: '',
        birthday: '',
        sex: '',
        description: '',
        image: null,
      },
    }
  },
  mounted() {
    const id = this.id = this.$route.params.id;
    if (id) {
      this.isEditing = true
      this.$axios.$get(`/admin/edit-product/${id}`)
        .then(product => {
          console.log("Editing: ", product)
          this.form = {
            name: product.name,
            color: product.color,
            birthday: product.birthday,
            sex: product.sex,
            description: product.description,
            image: product.image,
          }
        })
        .catch(err => console.log(err));

    } else {
      this.isEditing = false
    }
  },
  methods: {
    onSubmit() {
      const url = this.isEditing ? `/admin/edit-product` : '/admin/add-product';
      const formData = new FormData();

      formData.append('id', this.id);
      formData.append('userId', this.$auth.$state.user.id);
      formData.append('name', this.form.name);
      formData.append('color', this.form.color);
      formData.append('birthday', this.form.birthday);
      formData.append('sex', this.form.sex);
      formData.append('image', this.form.image);

      this.$axios.$post(url, formData)
        .then(res => {
          this.$router.push({ path: '/admin/products' });
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
    },
  }
}
</script>
