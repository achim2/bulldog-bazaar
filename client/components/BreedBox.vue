<template>
  <div class="breed-box" v-if="title && description">
    <b-icon-check2-circle/>
    <p class="breed-box__title" v-if="title">{{ title }}</p>
    <p class="breed-box__description" v-if="description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: ['title', 'description'],
};
</script>

<style lang="scss">
.breed-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: rgba($footer, .25);
  text-align: center;

  @include media-breakpoint-up(md) {
    height: 100%;
    min-height: 275px;
    padding: 30px;
  }

  .bi-check2-circle {
    color: $secondary;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .breed-box__title {
    color: $secondary;
    font-size: 22px;
    font-weight: 600;
  }

  .breed-box__description {
    font-size: 16px;
    font-weight: 300;

    @include media-breakpoint-up(md) {
      width: 75%;
    }
  }
}
</style>
