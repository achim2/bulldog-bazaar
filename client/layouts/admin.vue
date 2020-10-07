<template>
  <main class="layout layout--admin">
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
    Header,
    Alert,
  },
  middleware: 'auth',
}
</script>
