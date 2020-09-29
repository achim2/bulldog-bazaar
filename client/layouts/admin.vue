<template>
  <main>
    <Sidebar/>
    <Nuxt/>
  </main>
</template>
<script>
import Sidebar from '../components/admin/Sidebar';

export default {
  components: { Sidebar },
  middleware: 'auth',
}
</script>
