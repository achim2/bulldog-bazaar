<template>
  <div class="container">
    <h2 class="mb-4">Upload images to <b>{{ title }}</b></h2>
    <b-form v-on:change.prevent="handlingForm">

      <b-form-group
        id="image-upload"
        label="Choose images:"
        label-for="image-upload">
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
        <b-col v-for="(image, index) in images"
               :key="index"
               sm="6"
               md="4"
               lg="3"
        >
          <div class="uploaded">
            <b-img :src="`${$config.imagePath}/${image.filename}`"
                   :alt="image.filename"
                   :title="image.filename"
                   :data-selected="image.filename === selected"
                   thumbnail
                   fluid
            />
            <a v-if="selected && selected !== image.filename" @click="setSelected(image.filename)" class="btn btn-info mt-2">set selected</a>
            <a @click="deleteImage(image.filename)" class="btn btn-danger mt-2 mb-4">remove</a>
          </div>
        </b-col>
      </b-row>

    </b-form>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    'images',
    'selected',
  ],
  data() {
    return {
      newImages: [],
      deletedImage: '',
      selectedImage: '',
    };
  },
  methods: {
    handlingForm() {
      const formData = new FormData();
      formData.append('userId', this.$auth.$state.user.id);
      formData.append('deletedImage', this.deletedImage);
      formData.append('selectedImage', this.selectedImage);
      this.newImages.map(image => formData.append('images', image));
      this.newImages = [];
      this.deletedImage = '';
      this.selectedImage = '';
      this.$emit('onSubmit', formData);
    },
    deleteImage(name) {
      this.deletedImage = name;
      this.handlingForm();
    },
    setSelected(name) {
      this.selectedImage = name;
      this.handlingForm();
    }
  },
};
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
