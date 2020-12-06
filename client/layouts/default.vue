<template>
  <section class="layout layout--default">
    <Header/>
    <Alert/>
    <main>
      <Nuxt/>
    </main>
    <Footer/>
  </section>
</template>

<script>
import Header from '../components/Header';
import Alert from '../components/Alert';
import Footer from '../components/Footer';

export default {
  components: {
    Alert,
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch('fetchInfo');
  },
}
</script>
