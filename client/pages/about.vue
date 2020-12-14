<template>
  <div class="about">
    <PageTitle :title="$t('about')" :text="$t('about subtitle')"/>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';

export default {
  components: { PageTitle },
  data() {
    return {};
  },
  method: {}
};
</script>

<style lang="scss">
</style>
