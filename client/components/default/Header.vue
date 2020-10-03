<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">
        <Logo/>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="!$auth.loggedIn">
          <b-nav-item href="/signup">Sign up</b-nav-item>
          <b-nav-item href="/login">Login</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="$auth.loggedIn" class="ml-auto">
          <b-nav-item href="#">{{ $auth.user.name}}</b-nav-item>
          <b-nav-item href="/admin">Admin</b-nav-item>
          <b-nav-item @click="$auth.logout()">Logout</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
<!--        <b-navbar-nav class="ml-auto">-->
<!--          <b-nav-item-dropdown text="Lang" right>-->
<!--            <b-dropdown-item href="#">EN</b-dropdown-item>-->
<!--            <b-dropdown-item href="#">ES</b-dropdown-item>-->
<!--            <b-dropdown-item href="#">RU</b-dropdown-item>-->
<!--            <b-dropdown-item href="#">FA</b-dropdown-item>-->
<!--          </b-nav-item-dropdown>-->

<!--          <b-nav-item-dropdown right>-->
<!--            &lt;!&ndash; Using 'button-content' slot &ndash;&gt;-->
<!--            <template v-slot:button-content>-->
<!--              <em>User</em>-->
<!--            </template>-->
<!--            <b-dropdown-item href="#">Profile</b-dropdown-item>-->
<!--            <b-dropdown-item href="#">Sign Out</b-dropdown-item>-->
<!--          </b-nav-item-dropdown>-->
<!--        </b-navbar-nav>-->
      </b-collapse>
    </b-navbar>
</template>

<script>
import Logo from './../Logo';

export default {
  components: { Logo },
  mounted() {
    this.setNavbarScroll();
  },
  methods: {
    setNavbarScroll: () => {
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
    }
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
}
</style>
