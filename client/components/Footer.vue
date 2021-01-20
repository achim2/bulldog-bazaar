<template>
  <footer class="footer">

    <div class="footer__middle">
      <div class="container">
        <PageText :text="$t('paypal')" class="mb-0"/>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <facebook-embed :url="info.fbUrl"
                            v-if="info.fbUrl"/>
          </div>
          <div class="col-md-6">
            <div class="d-flex mb-3">
              <a :href="info.fbUrl"
                 v-if="info.fbUrl"
                 class="social mr-3"
                 target="_blank">
                <img :src="require('~/assets/images/facebook.png')" alt="facebook">
              </a>
              <a :href="info.instaUrl"
                 v-if="info.instaUrl"
                 class="social"
                 target="_blank">
                <img :src="require('~/assets/images/instagram.png')" alt="instagram">
              </a>
            </div>

            <p>{{ $t('available') }}</p>
            <p><b-icon-envelope /> - <b>{{ info.email }}</b></p>
            <p><b-icon-telephone /> - <b>{{ info.phone }}</b></p>
            <p><b-icon-geo-alt-fill /> - <b>Budapest, Hungary</b></p>

          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

import FacebookEmbed from '@/components/FacebookEmbed';
import PageText from './PageText';

export default {
  components: {
    PageText,
    FacebookEmbed,
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
};
</script>

<style lang="scss">
.footer {
  min-height: 200px;
  background: $footer;
  color: $footer-color;

  .footer__middle {
    padding: 10px 0;
    text-align: center;
    background: $footer-color;
    color: $footer;
  }

  .footer__bottom {
    padding: 2rem 0;
  }

  .social {
    img {
      width: 40px;
      height: auto;
    }
  }
}
</style>
