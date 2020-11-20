<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">
      <Logo/>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="!$auth.loggedIn" class="ml-auto">
        <b-nav-item to="/signup">Sign up</b-nav-item>
        <b-nav-item to="/login">Login</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-if="$auth.loggedIn" class="ml-auto">

        <b-nav-item to="/admin/products">Products</b-nav-item>
        <b-nav-item to="/admin/products/add">Add product</b-nav-item>

        <b-nav-item to="#">{{ $auth.user.name }}</b-nav-item>
        <b-nav-item to="/admin">Admin</b-nav-item>
        <b-nav-item @click="logout">Logout</b-nav-item>
      </b-navbar-nav>


    </b-collapse>
  </b-navbar>
</template>

<script>
import Logo from './Logo';

export default {
  components: { Logo },
  mounted() {
    this.setNavbarScroll();
  },
  methods: {
    setNavbarScroll() {
      let prevScrollpos = window.pageYOffset;
      const navbar = document.querySelector(".navbar");
      const navbarHeight = navbar.offsetHeight;

      window.onscroll = function () {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          navbar.style.top = "0";
        } else {
          navbar.style.top = -navbarHeight + "px";
        }
        prevScrollpos = currentScrollPos;
      }
    },
    async logout() {
      await this.$auth.logout();
      this.$notifier.showMessage({ message: ['You successful logged out!'], type: 'success' })
    },
  }
}
</script>

<style lang="scss">
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  transition: .25s ease;
  z-index: 100;
}
</style>
