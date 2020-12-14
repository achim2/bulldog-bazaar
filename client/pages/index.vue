<template>
  <div>
    <!--  Hero  -->
    <section class="hero" :style="{ backgroundImage: 'url(' + require('@/assets/hero.jpg') + ')' }">
      <div class="container">
        <div class="hero__inner">
          <h1 class="hero__title">{{ $t('hero title') }}</h1>
          <h3 class="hero__subtitle">{{ $t('hero subtitle') }}</h3>
        </div>
      </div>
    </section>

    <section class="breed-info">
      <div class="container">
        <PageText :text="$t('home text 0')" class="mt-5"/>
        <PageText :text="$t('home text 1')"/>

        <div class="text-center mb-5">
          <nuxtLink :to="localePath({name: 'about'})" class="mr-sm-3">{{ $t('about') }}</nuxtLink>
          <nuxtLink :to="localePath({name: 'breed'})">{{ $t('breed') }}</nuxtLink>
        </div>
      </div>
    </section>

    <Widget :items="filtered"/>

    <section class="">
      <div class="container">
        <PageText :text="$t('home text 3')" class="mt-5"/>
        <PageText :text="$t('home text 4')"/>
        <PageText :text="$t('home text 5')"/>

        <div class="text-center mb-2">
          <nuxtLink :to="localePath({name: 'contact'})">{{ $t('any question') }}</nuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PageText from '../components/PageText';
import Widget from '../components/Widget';

export default {
  components: { Widget, PageText },
  data() {
    return {
      filtered: [],
    };
  },
  mounted() {
    this.$axios.$get('/products/filtered')
      .then(res => {
        this.filtered = res;
      });
  },
};
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  align-items: flex-end;
  height: calc(100vh - 71.5px);
  margin-top: -2rem;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;

  .hero__inner {
    padding-bottom: 2rem;
  }

  .hero__title,
  .hero__subtitle {
    color: $white;
  }

  .hero__title {
    font-weight: 600;

    @include media-breakpoint-up(md) {
      font-size: 4em;
    }
    @include media-breakpoint-down(sm) {
      font-size: 2.5em;
    }
  }

  .hero__subtitle {
    @include media-breakpoint-down(sm) {
      font-size: 1.5em;
    }
  }
}
</style>
