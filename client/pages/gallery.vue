<template>
  <div class="gallery">
    <div class="container">
      <h2>Gallery</h2>

      <div class="row">
        <div class="col-sm-6 col-md-4"
             v-for="image in items" :key="image.filename">
            <picture>
              <source :data-srcset="`${$config.imagePath}/${image.filename}`"
                      type="image/webp"
                      class="lazyload"/>
              <source :data-srcset="`${$config.imagePath}/${image.filename}`"
                      type="image/jpeg"
                      class="lazyload"/>
              <img :data-src="`${$config.imagePath}/${image.filename}`"
                   :alt="image.filename"
                   class="lazyload"/>
            </picture>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  mounted() {
    this.$axios.$get('/gallery')
      .then(res => {
        console.log(res)
        this.items = res;
      })
  },
}</script>

<style lang="scss">
</style>
