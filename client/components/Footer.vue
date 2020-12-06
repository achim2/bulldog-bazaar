<template>
  <footer class="footer">
    <div class="container">
      <Logo/>
      <p>social icons</p>
      <p>Email: {{ info.email }}</p>
      <p>{{ $t('phone') }}: {{ info.phone }}</p>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

import Logo from '@/components/Logo';

export default {
  components: { Logo },
  computed: {
    ...mapGetters([
      'info'
    ])
  }
}
</script>

<style lang="scss">
.footer {
  min-height: 200px;
  padding: 2rem 0;
  background: $footer;
  color: $footer-color;
}
</style>
