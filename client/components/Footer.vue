<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-6">

          <Logo/>
          <p>social icons</p>
          <p>Email: {{ info.email }}</p>
          <p>{{ $t('phone') }}: {{ info.phone }}</p>

        </div>
        <div class="col-md-6">
<!--          <facebook-embed :oembed-html="oembed"/>-->
          <!-- OR -->
<!--          <facebook-embed :url="url"/>-->
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
  data() {
    return {
      oembed: '',
      url: 'https://www.facebook.com/bihoneszter1',
    };
  }
};
</script>

<style lang="scss">
.footer {
  min-height: 200px;
  padding: 2rem 0;
  background: $footer;
  color: $footer-color;
}
</style>
