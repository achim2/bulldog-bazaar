<template>
  <div class="container">
    <h2 class="mb-4">Upload images to product: {{ this.name }}</h2>
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
      </b-form-group>

      <hr>

      <b-row>
        <b-col v-for="(image, index) in oldImages"
               :key="index"
               :data-selected="image.selected"
               sm="6"
               md="4"
               lg="3"
        >
          <div class="uploaded">
            <b-img :data-src="`${$config.imagePath}/${image.name}`"
                   :alt="image.name"
                   :title="image.name"
                   :data-selected="image.selected"
                   class="lazyload"
                   thumbnail
                   fluid
            />
            <a v-if="!image.selected" @click="setSelected(image.name)" class="btn btn-info mt-2">set selected</a>
            <a @click="deleteImage(image.name)" class="btn btn-danger mt-2 mb-4">remove</a>
          </div>
        </b-col>
      </b-row>

      <hr>

      <div class="d-flex flex-column justify-content-between align-items-start pb-2">
        <nuxtLink :to="localePath({name: 'product-edit', params: {id: this.id}})" class="btn btn-secondary mr-2 mb-2">Back to details</nuxtLink>
        <nuxtLink :to="localePath({name: 'admin-products'})" class="btn btn-primary">Products</nuxtLink>
      </div>

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
          this.oldImages = product.images;
          this.name = product.name;
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.$router.push(this.localePath({ name: 'admin-products' }));
          }
        });
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
  flex-direction: column;

  img[data-selected='true'] {
    border: 2px solid red;
  }
}
</style>
