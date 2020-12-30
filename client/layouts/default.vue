<template>
  <section class="layout layout--default">
    <Header/>
    <Alert/>
    <main>
      <Nuxt/>
    </main>
    <Footer/>
    <LocaleChooser/>
    <CookieMessage/>
  </section>
</template>

<script>
import Header from '../components/Header';
import Alert from '../components/Alert';
import Footer from '../components/Footer';
import LocaleChooser from '../components/LocaleChooser';
import CookieMessage from '../components/CookieMessage';

export default {
  components: {
    CookieMessage,
    LocaleChooser,
    Alert,
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch('fetchInfo');
  },
};
</script>
