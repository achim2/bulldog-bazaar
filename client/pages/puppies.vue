<template>
  <div>
    <section>
      <page-subtitle :text="$t('available puppies')"/>
      <Widget :items="filtered"/>
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
    this.$axios.$get('/products/filtered')
      .then(res => {
        this.filtered = res;
      });
  },
};
</script>

<style lang="scss" scoped>
</style>
