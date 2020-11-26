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

      <div class="uploaded">
        <div v-for="(image, index) in oldImages"
             class="uploaded__image-wrapper"
             :data-selected="image.selected">
          <img :src="`${$config.imagePath}/${image.name}`"
               :alt="image.name"
               :title="image.name">
          <a v-if="!image.selected" @click="setSelected(image.name)" class="btn btn-info mb-1">set selected</a>
          <a @click="deleteImage(image.name)" class="btn btn-danger">remove</a>
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
      deletedImage: '',
      selectedImage: '',
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
      formData.append('deletedImage', this.deletedImage);
      formData.append('selectedImage', this.selectedImage);
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
        .finally(() => {
          this.deletedImage = '';
          this.selectedImage = '';
        })
    },
    deleteImage(name) {
      this.deletedImage = name;
      this.onSubmit();
    },
    setSelected(name) {
      this.selectedImage = name;
      this.onSubmit();
    }
  }
}
</script>

<style lang="scss">
.uploaded {
  display: flex;
  flex-wrap: wrap;

  .uploaded__image-wrapper {
    display: flex;
    flex-direction: column;

    &[data-selected='true'] {
      border: 2px solid red;
    }

    img {
      width: 100px;
      height: auto;
      margin: 10px;
    }

    a {
      cursor: pointer;
    }
  }
}
</style>
