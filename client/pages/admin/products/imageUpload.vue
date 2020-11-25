<template>
  <div class="container">
    <h2>Upload images to product: {{ this.name }}</h2>
    <b-form @submit="onSubmit"
            @submit.stop.prevent
            v-on:change.prevent="onSubmit">

      <b-form-group
        id="input-group-7"
        label="Choose images:"
        label-for="input-7">
        <b-form-file
          multiple
          accept="image/jpeg, image/png, image/gif"
          v-model="newImages"
          :state="Boolean(newImages)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <!--        <div class="mt-3">Selected file: {{ images ? images.name : '' }}</div>-->
      </b-form-group>

      <br>

      <div class="d-flex">
        <div v-for="image in oldImages">
          <span @click="deleteImage(image)" style="cursor: pointer">remove</span>
          <img :src="`${$config.imagePath}/${image}`"
               :alt="image"
               :title="image"
               style="width: 100px; height: auto; margin-right: 10px"
          >
        </div>
      </div>

      <br>

      <nuxtLink :to="{name: 'product-edit', params: {id: this.id}}" class="btn btn-secondary">Back</nuxtLink>
      <nuxtLink :to="{name: 'admin-products'}" class="btn btn-secondary">Products</nuxtLink>

    </b-form>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      id: null,
      name: '',
      newImages: [],
      oldImages: [],
    }
  },
  mounted() {
    const id = this.id = this.$route.params.id;
    if (id) {
      this.$axios.$get(`/admin/edit-product/${id}`)
        .then(product => {
          console.log("Editing: ", product)
          this.oldImages = product.images;
          this.name = product.name;
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.$router.push({ path: '/admin/products' });
          }
        });
    } else {
      this.$router.push({ path: '/admin/products' });
    }
  },
  methods: {
    onSubmit() {
      const formData = new FormData();
      formData.append('productId', this.id);
      formData.append('userId', this.$auth.$state.user.id);
      //send array with image names info
      formData.append('oldImages', JSON.stringify(this.oldImages));
      //send images
      this.newImages.map(image => formData.append('images', image));

      this.$axios.$post(`/admin/update-product-images`, formData)
        .then(res => {
          this.oldImages = res.product.images;
          this.newImages = [];
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
    deleteImage(name) {
      this.oldImages = this.oldImages.filter(image => image !== name);
      this.onSubmit();
    },
  }
}
</script>
