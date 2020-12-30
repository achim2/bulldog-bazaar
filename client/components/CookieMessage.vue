<template>
  <div :class="['cookie-message', {active: active}]">
    <p>{{ $t('cookie-message') }}</p>
    <button class="btn btn-primary" @click="accept">Accept</button>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      active: true,
    };
  },
  mounted() {
    if (this.$storage.getCookieMessage() != null) {
      this.active = false;
    }
  },
  methods: {
    accept() {
      this.active = false;
      this.$storage.setCookieMessage();
    }
  }
};
</script>

<style lang="scss">
.cookie-message {
  position: sticky;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 0;
  padding: 0;
  transition: .25s ease;
  background: $footer-color;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  z-index: 0;

  &.active {
    height: auto;
    padding: 10px;
    opacity: 1;
    visibility: visible;
    z-index: 901;
  }

  p {
    margin: 0;
    color: $white;
  }
}
</style>
