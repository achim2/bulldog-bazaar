<template>
  <div class="container">

    <ImageUpload :title="title"
                 :images="images"
                 :selected="selected"
                 v-on:onSubmit="onSubmit"/>

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
      selected: '',
    };
  },
  mounted() {
    const id = this.id = this.$route.params.id;
    if (id) {
      this.$axios.$get(`/admin/edit-product/${id}`)
        .then(product => {
          this.images = product.images;
          this.title = product.name;
          this.selected = product.selectedFilename;
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.$router.push(this.localePath({ name: 'admin-products' }));
          }
        });
    }
  },
  methods: {
    onSubmit(formData) {
      formData.append('productId', this.id);

      this.$axios.$post(`/admin/update-product-images`, formData)
        .then(res => {
          this.images = res.product.images;
          this.selected = res.product.selectedFilename;
          this.$notifier.showMessage({ message: [res.message], type: 'success' });
        })
        .catch(err => {
          const errors = err.response.data.errors;
          const msg = err.response.data.message;

          if (errors) {
            this.$notifier.showMessage({ message: errors.map(obj => obj.msg), type: 'danger' });
          } else {
            this.$notifier.showMessage({ message: [msg], type: 'danger' });
          }
        });
    }
  },
};
</script>
