<template>
  <main class="layout layout--default">
    <Header/>
    <Alert/>
    <Nuxt/>
    <Footer/>
  </main>
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
}
</script>
