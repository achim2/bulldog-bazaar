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

    </b-form>
    <hr>

    <draggable :list="images"
               :move="handleMove"
               @end="handleDragEnd"
               class="row">
      <b-col v-for="(image, index) in images"
             :key="images.index"
             class="col-6"
             md="4"
             lg="3"
      >
        <div class="uploaded">
          <b-img :src="`${$config.imagePath}/${image.filename}`"
                 :alt="image.filename"
                 :title="image.filename"
                 thumbnail
                 fluid
          />
          <a @click="$emit('onDelete', image.filename)" class="btn btn-danger">
            <b-icon-trash />
          </a>
        </div>
      </b-col>
    </draggable>

  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  props: [
    'title',
    'images',
  ],
  components: {
    draggable,
  },
  data() {
    return {
      newImages: [],
    };
  },
  methods: {
    handlingForm() {
      const formData = new FormData();
      formData.append('userId', this.$auth.$state.user.id);
      this.newImages.map(image => formData.append('images', image));
      this.newImages = [];
      this.$emit('onSubmit', formData);
    },
    handleMove(e) {
      //   console.log('filename: ', e.draggedContext.element.filename);
    },
    handleDragEnd() {
      this.$emit('handleDragEnd', Object.assign([], this.images));
    },
  },
};
</script>

<style lang="scss">
.uploaded {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  .btn.btn-danger {
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    width: auto;
  }
}
</style>
