<template>
  <div class="container page-title mb-5">
    <h1 class="text-center mb-3" v-if="title">{{ title }}</h1>
    <PageText :text="text" v-if="text" />
  </div>
</template>

<script>
import PageText from './PageText';
export default {
  components: { PageText },
  props: [
    'title',
    'text',
  ],
};
</script>

<style lang="scss" scoped>
.page-title {
  h1 {
    color: $secondary;
  }
}
</style>
