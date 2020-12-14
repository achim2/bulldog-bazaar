<template>
  <section class="widget">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-4"
             v-for="item in items" :key="item._id">
          <nuxtLink :to="localePath(`/${item.slug}`)" class="item">
            <div class="item__img-wrapper">
              <img :data-src="`${$config.imagePath}/${item.selectedFilename}`"
                   :alt="item.name"
                   class="item__img lazyload"/>
            </div>
            <div class="item__content">
              <span class="item__name">{{ item.name }}</span> -
              <span class="item__gender">{{ item.gender }}</span>
            </div>
          </nuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['items'],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  display: block;
  margin-bottom: 15px;
  border-radius: 5px;
  overflow: hidden;

  @include media-breakpoint-up(sm) {
    margin-bottom: 30px;
  }

  &:hover {
    .item__img {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  .item__img-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }

  .item__img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%) scale(1);
    transition: .25s ease;
  }

  .item__content {
    position: absolute;
    left: 5px;
    bottom: 5px;
    padding: 7.5px 15px 5px;
    border-radius: 5px;
    background: $white;
  }

  .item__name,
  .item__gender {
    color: $header;
  }

  .item__name {
    font-weight: 600;
  }

  .item__gender {
    font-weight: 300;
  }
}
</style>
