<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-6">

          <Logo/>
          <a :href="info.fbUrl"
             v-if="info.fbUrl"
             class="social"
             target="_blank">
            <img :src="require('~/assets/facebook.png')" alt="facebook">
          </a>
          <a :href="info.instaUrl"
             v-if="info.instaUrl"
             class="social"
             target="_blank">
            <img :src="require('~/assets/instagram.png')" alt="instagram">
          </a>

          <br>
          <p>Email: {{ info.email }}</p>
          <p>{{ $t('phone') }}: {{ info.phone }}</p>

          <p>{{ $t('available') }}</p>
          <p>{{ $t('paypal') }}</p>
          <p>{{ $t('payment') }}</p>

        </div>
        <div class="col-md-6">
          <!--          <facebook-embed :oembed-html="oembed"/>-->
          <!-- OR -->
          <facebook-embed :url="info.fbUrl"
                          v-if="info.fbUrl"/>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

import Logo from '@/components/Logo';
import FacebookEmbed from '@/components/FacebookEmbed';

export default {
  components: {
    Logo,
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
  padding: 2rem 0;
  background: $footer;
  color: $footer-color;

  .social {
    img {
      width: 40px;
      height: auto;
    }
  }
}
</style>
