<template>
  <div class="container">

    <ImageUpload
      title="Gallery"
      :images="images"
      v-on:onSubmit="onSubmit"
      v-on:onDelete="onDelete"
      v-on:handleDragEnd="handleDragEnd"
    />

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
    this.fetchImages();
  },
  methods: {
    fetchImages() {
      this.$axios.get('/admin/gallery')
        .then(res => {
          if (res && res.data && res.data) {
            // add sorted arr to image upload
            this.images = res.data.sort((a, b) => a.index - b.index);
          }
        });
    },
    onSubmit(formData) {
      this.$axios.$post(`/admin/update-gallery`, formData)
        .then(res => {
          this.images = [...this.images, ...res.result];
          this.$notifier.showMessage({ message: [res.message], type: 'success' });
        });
    },
    onDelete(filename) {
      this.$axios.$post('/admin/delete-gallery-image', { deletedImage: filename })
        .then(res => {
          if (res.result) {
            this.images = res.result;
            this.$notifier.showMessage({ message: [res.message], type: 'success' });
          }
        });
    },
    handleDragEnd(arr) {
      this.$axios.$post('/admin/update-gallery-image-index', { images: arr })
        .then(res => {
          this.images = res.result;
          this.$notifier.showMessage({ message: [res.message], type: 'success' });
        });
    }
  },
};
</script>
