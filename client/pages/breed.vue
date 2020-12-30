<template>
  <section class="section--breed">
    <PageTitle :title="$t('breed')" :text="$t('breed subtitle')"/>

    <div class="container">
      <img :src="require('~/assets/images/breed-bull.jpg')"
           alt="bulldog">

      <div class="row">
        <div class="col-md-6">
          <BreedBox :title="$t('friendly')" :description="$t('friendly desc')"/>
        </div>
        <div class="col-md-6">
          <BreedBox :title="$t('alone')" :description="$t('alone desc')"/>
        </div>
        <div class="col-md-6">
          <BreedBox :title="$t('housekeeper')" :description="$t('housekeeper desc')"/>
        </div>
        <div class="col-md-6">
          <BreedBox :title="$t('excercise')" :description="$t('excercise desc')"/>
        </div>
      </div>

      <br>

      <BreedInfo :title="$t('personality')" :description="$t('personality desc')"/>
      <BreedInfo :title="$t('care')" :description="$t('care desc')"/>
      <BreedInfo :title="$t('feeding')" :description="$t('feeding desc')"/>
      <BreedInfo :title="$t('grooming')" :description="$t('grooming desc')"/>

    </div>
  </section>
</template>

<script>
import PageTitle from '../components/PageTitle';
import BreedBox from '../components/BreedBox';
import BreedInfo from '../components/BreedInfo';

export default {
  components: { BreedInfo, BreedBox, PageTitle },
  data() {
    return {};
  },
  method: {}
};
</script>

<style lang="scss">
.section--breed {
 img {
   margin-bottom: 10px;
 }
}
</style>
