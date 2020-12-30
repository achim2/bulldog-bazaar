<template>
  <div :class="['locales', {active: active}]">
    <h2 class="locales__title">{{$t('choose-lang')}}</h2>
    <div class="locales__wrapper">
      <div class="locales__item"
           v-for="locale in locales"
           :key="locale.code"
           @click="setLocale(locale.code)"
      >
        <img :src="require(`~/assets/images/${locale.code}.jpg`)"
             :alt="locale.code"
             :title="locale.code">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      active: false,
    };
  },
  computed: {
    locales() {
      return this.$i18n.locales;
    }
  },
  mounted() {
    const code = this.$storage.getLocale();
    if (code != null) {
      this.$i18n.setLocale(code);
    } else {
      this.active = true;
    }
  },
  methods: {
    setLocale(locale) {
      this.$i18n.setLocale(locale);
      this.$storage.setLocale(locale);
      this.active = false;
    }
  }
};
</script>

<style lang="scss">
.locales {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .9);
  transition: .25s ease;
  opacity: 0;
  visibility: hidden;
  z-index: 0;

  &.active {
    opacity: 1;
    visibility: visible;
    z-index: 901;
  }

  .locales__title {
    margin-bottom: 2rem;
    color: $white;
  }

  .locales__wrapper {
    display: flex;

    @include media-breakpoint-down(sm) {
      flex-direction: column;
    }
  }

  .locales__item {
    cursor: pointer;
    height: auto;
    margin: 10px;

    img {
      width: 100%;
    }
  }
}
</style>
