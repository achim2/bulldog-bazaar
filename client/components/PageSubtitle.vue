<template>
  <h2 v-if="text" class="page-text mb-4 mx-auto">{{ text }}</h2>
</template>

<script>
export default {
  props: [
    'text',
  ],
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;

  @include media-breakpoint-up(md) {
    max-width: 75%;
  }
}
</style>
