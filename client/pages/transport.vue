<template>
  <section class="section--transport">
    <PageTitle :title="$t('how to get')"/>

    <div class="container">
      <PageText :text="$t('transport text 0')"/>

      <img :src="require('~/assets/images/airplane.png')"
           alt="transport">

      <PageText :text="$t('transport text 1')"/>

      <div class="text-center my-5">
        <nuxtLink :to="localePath({name: 'contact'})" class="btn btn-info">{{ $t('any question') }}</nuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import PageTitle from '../components/PageTitle';
import PageText from '../components/PageText';

export default {
  components: { PageText, PageTitle }
};
</script>

<style lang="scss">
.section--transport {
  img {
    max-width: 400px;
    margin: 0 auto 1rem;
  }
}
</style>
