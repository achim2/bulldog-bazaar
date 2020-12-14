<template>
  <div class="gallery">
    <PageTitle :title="$t('gallery')"/>

    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-4"
             v-for="image in items" :key="image.filename"
             :style="{'order': image.index}">
          <img :data-src="`${$config.imagePath}/${image.filename}`"
               :alt="image.filename"
               class="lazyload"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';

export default {
  components: { PageTitle },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.$axios.$get('/gallery')
      .then(res => {
        console.log(res);
        this.items = res;
      });
  },
};</script>

<style lang="scss">
</style>
