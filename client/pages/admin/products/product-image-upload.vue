<template>
  <div class="container">

    <ImageUpload
      :title="title"
      :images="images"
      v-on:onSubmit="onSubmit"
      v-on:onDelete="onDelete"
      v-on:handleDragEnd="handleDragEnd"
    />

    <hr>

    <div class="d-flex align-items-start pb-2">
      <nuxtLink :to="localePath({name: 'product-edit', params: {id: this.id}})" class="btn btn-secondary mr-2 mb-2">Back to details</nuxtLink>
      <nuxtLink :to="localePath({name: 'admin-products'})" class="btn btn-primary">Products</nuxtLink>
    </div>

  </div>
</template>

<script>
import ImageUpload from '@/components/imageUpload';

export default {
  components: { ImageUpload },
  layout: 'admin',
  data() {
    return {
      id: '',
      title: '',
      images: [],
    };
  },
  mounted() {
    this.fetchImages();
  },
  methods: {
    fetchImages() {
      const id = this.id = this.$route.params.id;
      if (id) {
        this.$axios.$get(`/admin/edit-product/${id}`)
          .then(product => {
            this.images = product.images;
            this.title = product.name;
          })
          .catch(err => {
            if (err.response.status === 404) {
              this.$router.push(this.localePath({ name: 'admin-products' }));
            }
          });
      }
    },
    onSubmit(formData) {
      formData.append('productId', this.id);

      this.$axios.$post(`/admin/update-product-images`, formData)
        .then(res => {
          this.images = res.product.images;
          this.$notifier.showMessage({ message: [res.message], type: 'success' });
        });
    },
    onDelete(filename) {
      this.$axios.$post('/admin/delete-product-image', {
        userId: this.$auth.$state.user.id,
        productId: this.id,
        deletedImage: filename,
      })
        .then(res => {
          this.images = res.product.images;
          this.$notifier.showMessage({ message: [res.message], type: 'success' });
        });
    },
    handleDragEnd(arr) {
      this.$axios.$post('/admin/update-product-image-index', {
        userId: this.$auth.$state.user.id,
        productId: this.id,
        images: arr,
      })
        .then(res => {
          this.images = res.product.images;
          this.$notifier.showMessage({ message: [res.message], type: 'success' });
        });
    }
  },
};
</script>
