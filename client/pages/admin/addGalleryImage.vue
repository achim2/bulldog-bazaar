<template>
  <div class="container">

    <ImageUpload title="Gallery"
                 :images="images"
                 v-on:onSubmit="onSubmit"/>

  </div>
</template>

<script>
import ImageUpload from '@/components/imageUpload';

export default {
  components: { ImageUpload },
  layout: 'admin',
  data() {
    return {
      images: [],
    };
  },
  mounted() {
    this.$axios.get('/admin/gallery')
      .then(res => {
        if (res && res.data && res.data) {
          this.images = res.data;
        }
      })
      .catch(err => console.log(err));
  },
  methods: {
    onSubmit(formData) {
      this.$axios.$post(`/admin/update-gallery`, formData)
        .then(res => {
          if (Array.isArray(res.result)) {
            this.images = [...this.images, ...res.result];
          } else {
            this.images = this.images.filter(image => image.filename !== res.result.filename);
          }
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
