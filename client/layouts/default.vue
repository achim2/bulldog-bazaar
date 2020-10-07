<template>
  <main class="layout layout--default">
    <Header/>
    <Alert/>
    <Nuxt/>
  </main>
</template>

<script>
import Header from '../components/Header';
import Alert from '../components/Alert';

export default {
  components: {
    Alert,
    Header,
  },
}
</script>
