<template>
  <main :class="['layout layout--admin', {'layout--opened': isSidebarOpen}]">
    <a class="layout__toggle" @click="sidebarToggle">Toggle</a>
    <Sidebar/>
    <Alert/>
    <Nuxt/>
  </main>
</template>

<script>
import Sidebar from '../components/Sidebar';
import Alert from '../components/Alert';

export default {
  components: {
    Sidebar,
    Alert,
  },
  middleware: 'auth',
  data() {
    return {
      isSidebarOpen: true,
    }
  },
  methods: {
    sidebarToggle() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
}
</script>

<style lang="scss">
$sidebar-width: 320px;

.layout--admin {
  background: darkslategray;
  margin-left: 0;
  padding-top: 50px;
  transition: .2s ease;

  &.layout--opened {
    margin-left: $sidebar-width;

    .sidebar {
      width: $sidebar-width;
    }
  }

  .layout__toggle {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1;
  }
}
</style>
