<template>
  <div :class="['loading-page', {'active': loading}]">
    <img :src="require(`~/assets/images/loader.svg`)" alt="loading..."/>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    //to reach this method: this.$nuxt.$loading.start();
    start() {
      this.loading = true
    },
    //to reach this method: this.$nuxt.$loading.finish();
    finish() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .5);
  z-index: 1001;
  transition: .25s ease;
  opacity: 0;
  visibility: hidden;

  img {
    max-width: 200px;
  }

  &.active {
    opacity: 1;
    visibility: visible;
  }
}
</style>
