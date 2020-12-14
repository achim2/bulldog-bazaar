<template>
  <div class="breed-info" v-if="title && description">
    <p class="breed-info__title" v-if="title">{{ title }}</p>
    <p class="breed-info__description" v-if="description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: ['title', 'description'],
};
</script>

<style lang="scss">
.breed-info {
  text-align: center;
  padding: 15px;

  @include media-breakpoint-up(md) {
    max-width: 70%;
    margin-right: auto;
    margin-left: auto;
  }

  .breed-info__title {
    text-transform: uppercase;
    font-weight: 600;
  }

  .breed-info__description {
    font-weight: 300;
  }
}
</style>
