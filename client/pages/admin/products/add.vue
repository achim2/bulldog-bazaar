<template>
  <div class="container">
    <h2>Add product</h2>

    <b-form @submit="onSubmit"
            @submit.stop.prevent>
      <div class="row">
        <div class="col-md-6">
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
        </div>

        <div class="col-md-6">
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
        </div>

        <div class="col-md-6">
          <!-- birthday -->
          <b-form-group
            id="input-group-4"
            label="Birthday:"
            label-for="input-4">
            <b-form-datepicker id="input-4"
                               v-model="form.birthday"
                               :date-format-options="{ year: 'numeric', month: 'long', day: '2-digit'}"
                               today-button
            ></b-form-datepicker>
          </b-form-group>

        </div>
        <div class="col-md-6">
          <!-- gender -->
          <b-form-group
            id="input-group-5"
            label="Gender:"
            label-for="input-5">
            <b-form-select v-model="form.gender" :options="options" id="input-5"></b-form-select>
          </b-form-group>
        </div>
      </div>

      <!-- Description -->
      <b-form-group
        id="input-group-6"
        label="Description: (in ENGLISH) (important for meta tags (FB, instagram))"
        label-for="input-6">
        <b-form-textarea
          id="input-6"
          v-model="form.description[0].text"
          required
          placeholder="Enter description"
          rows="3"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-7"
        label="Description: (in HUNGARIAN)"
        label-for="input-7">
        <b-form-textarea
          id="input-7"
          v-model="form.description[1].text"
          required
          placeholder="Enter description"
          rows="3"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-8"
        label="Description: (in GERMAN)"
        label-for="input-8">
        <b-form-textarea
          id="input-8"
          v-model="form.description[2].text"
          required
          placeholder="Enter description"
          rows="3"
        ></b-form-textarea>
      </b-form-group>

      <div class="d-flex flex-wrap justify-content-between align-items-start pb-2">
        <b-button type="submit" variant="secondary" class="mr-2 mb-2" v-on:click.prevent="onSubmit(true)">Save & back to products</b-button>
        <b-button type="submit" variant="primary" v-on:click.prevent="onSubmit(false)">Save & upload images</b-button>
      </div>
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
        gender: null,
        description: [
          {
            locale: 'en',
            text: '',
          },
          {
            locale: 'hu',
            text: '',
          },
          {
            locale: 'de',
            text: '',
          },
        ]
      },
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' },
      ]
    }
  },
  mounted() {
    const id = this.id = this.$route.params.id;
    if (id) {
      this.isEditing = true
      this.$axios.$get(`/admin/edit-product/${id}`)
        .then(product => {
          this.form = {
            name: product.name,
            color: product.color,
            birthday: product.birthday,
            gender: product.gender,
            description: product.description,
          };
        })
        .catch(err => console.log(err));

    } else {
      this.isEditing = false
    }
  },
  methods: {
    onSubmit(back) {
      const url = this.isEditing ? `/admin/edit-product` : '/admin/add-product';

      this.$axios.$post(url, {
        userId: this.$auth.$state.user.id,
        productId: this.id,
        ...this.form
      })
        .then(res => {
          if (back) {
            this.$router.push(this.localePath({ name: `admin-products`}));
          } else {
            this.$router.push(this.localePath({ name: `product-image-upload`, params: { id: res.product._id } }));
          }
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
