<template>
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand to="/">
      <Logo/>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{name: 'index'}">Home</b-nav-item>
        <b-nav-item :to="{name: 'breed'}">Breed info</b-nav-item>
        <b-nav-item :to="{name: 'about'}">About us</b-nav-item>
        <b-nav-item :to="{name: 'contact'}">Contact us</b-nav-item>
      </b-navbar-nav>

      <!--      <b-navbar-nav v-if="!$auth.loggedIn" class="ml-auto">-->
      <!--        <b-nav-item to="/signup">Sign up</b-nav-item>-->
      <!--        <b-nav-item to="/login">Login</b-nav-item>-->
      <!--      </b-navbar-nav>-->

      <b-navbar-nav class="navbar-nav--admin" v-if="$auth.loggedIn">
        <b-nav-item to="#">{{ $auth.user.name }}</b-nav-item>
        <b-nav-item to="/admin/products">Products</b-nav-item>
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
.navbar,
.navbar.navbar-dark {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  transition: .25s ease;
  z-index: 100;
  background: $header;

  .navbar-nav.navbar-nav--admin {
    @include media-breakpoint-down(md) {
      border-top: 1px solid $white;
    }

    @include media-breakpoint-up(lg) {
      border-left: 1px solid $white;
    }
  }

  .nav-link {
    color: $white;
  }
}
</style>
