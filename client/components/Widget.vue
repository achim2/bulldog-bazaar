<template>
  <section class="section--widget" v-if="items">
    <div class="container">
      <div class="row">
        <div :class="['col-md-6', {'col-lg-4': items.length > 4}]"
             v-for="item in items" :key="item._id">
          <nuxtLink :to="localePath(`/${item.slug}`)"
                    class="widget">

            <CustomImage :image="item" v-if="item"/>

            <div class="widget__content" v-if="item && (item.name || item.gender || item.birthday)">
              <span class="widget__name" v-if="item.name"><b>{{ item.name }}</b>,</span>
              <span class="widget__gender" v-if="item.gender">{{ $t(item.gender) }}</span>
              <span class="widget__birthday" v-if="item.gender"><b>{{ $t('birthday') }}</b>: {{ (item.birthday)| dateFilter($i18n.locale) }}</span>
            </div>
          </nuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CustomImage from './CustomImage';

export default {
  components: { CustomImage },
  props: ['items'],
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.widget {
  position: relative;
  display: block;
  border-radius: 5px;
  overflow: hidden;

  &:hover {
    .custom-image {
      img {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }

    .widget__birthday {
      height: 24px;
      visibility: visible;
      opacity: 1;
    }
  }

  .custom-image {
    img {
      transform: translate(-50%, -50%) scale(1);
      transition: .45s ease;
    }
  }

  .widget__content {
    position: absolute;
    left: 5px;
    bottom: 5px;
    max-width: calc(100% - 10px);
    padding: 7.5px 15px 5px;
    border-radius: 5px;
    background: $white;
    overflow: hidden;
  }

  span {
    color: $header;
  }

  .widget__gender {
    font-weight: 300;
  }

  .widget__birthday {
    height: 0;
    display: block;
    transition: .25s ease;
    opacity: 0;
    visibility: hidden;
    font-weight: 300;
  }
}
</style>
