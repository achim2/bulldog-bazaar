<template>
  <div class="custom-image">
    <img :data-src="`${$config.imagePath}/${image.selectedFilename ? image.selectedFilename : image.filename}`"
         :alt="image.name ? image.name : image.filename"
         v-if="image"
         class=" lazyload"
    />
  </div>
</template>

<script>
export default {
  props: ['image'],
};
</script>

<style lang="scss">
.custom-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border-radius: 5px;
  overflow: hidden;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
}
</style>
