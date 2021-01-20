<template>
  <div>
    <!--  Hero  -->
    <section class="hero" :style="{ backgroundImage: 'url(' + require('@/assets/images/hero.jpg') + ')' }">
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
          <nuxtLink :to="localePath({name: 'breed'})" class="btn btn-info">{{ $t('breed') }}</nuxtLink>
        </div>
      </div>
    </section>

    <section>
      <page-subtitle :text="$t('available puppies')"/>
      <Widget :items="filtered"/>
      <div class="text-center mt-3 mb-5">
        <nuxtLink :to="localePath({name: 'puppies'})" class="btn btn-info">{{ $t('all available') }}</nuxtLink>
      </div>
    </section>

    <section class="">
      <div class="container">
        <PageText :text="$t('home text 3')" class="mt-5"/>
        <PageText :text="$t('home text 4')"/>
        <PageText :text="$t('home text 5')"/>

        <div class="text-center mb-2">
          <nuxtLink :to="localePath({name: 'contact'})" class="btn btn-info">{{ $t('any question') }}</nuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PageText from '../components/PageText';
import Widget from '../components/Widget';
import PageSubtitle from '../components/PageSubtitle';

export default {
  components: { PageSubtitle, Widget, PageText },
  data() {
    return {
      filtered: [],
    };
  },
  mounted() {
    this.$axios.$get('/products/filtered/6')
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
    padding-bottom: 5rem;
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
