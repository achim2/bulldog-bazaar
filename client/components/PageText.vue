<template>
  <p v-if="text" class="page-text">{{ text }}</p>
</template>

<script>
export default {
  props: [
    'text',
  ],
};
</script>

<style lang="scss" scoped>
p {
  margin-right: auto;
  margin-left: auto;
  text-align: center;

  @include media-breakpoint-up(md) {
    max-width: 75%;
  }
}
</style>
