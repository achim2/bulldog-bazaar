<template>
  <div class="section--gallery">
    <PageTitle :title="$t('gallery')"/>

    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="row">

            <div class="col-md-6 col-lg-4"
                 v-for="image in items" :key="image.filename"
                 :style="{'order': image.index}">
              <CustomImage :image="image"/>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import CustomImage from '../components/CustomImage';

export default {
  components: { CustomImage, PageTitle },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.$axios.$get('/gallery')
      .then(res => {
        this.items = res;
      })
      .catch(err => console.log(err));
  },
};</script>

<style lang="scss">
.section--gallery {
}
</style>
