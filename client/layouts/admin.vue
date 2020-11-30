<template>
  <section :class="['layout layout--admin']">
    <Header/>
    <Alert/>
    <main>
      <Nuxt/>
    </main>
  </section>
</template>

<script>
import Alert from '../components/Alert';
import Header from '../components/Header';

export default {
  components: {
    Alert,
    Header,
  },
  middleware: 'auth',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.layout--admin {
  background: #ccc;
}
</style>
