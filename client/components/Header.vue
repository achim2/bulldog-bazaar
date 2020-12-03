<template>
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand :to="localePath({name: 'index'})">
      <Logo/>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="localePath({name: 'index'})">{{ $t('home') }}</b-nav-item>
        <b-nav-item :to="localePath({name: 'breed'})">{{ $t('breedInfo') }}</b-nav-item>
        <b-nav-item :to="localePath({name: 'about'})">{{ $t('aboutUs') }}</b-nav-item>
        <b-nav-item :to="localePath({name: 'contact'})">{{ $t('contactUs') }}</b-nav-item>

        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="$i18n.setLocale(locale.code)"
          >{{ locale.code }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav class="navbar-nav--admin" v-if="$auth.loggedIn">
        <!--        <b-nav-item to="#">{{ $auth.user.name }}</b-nav-item>-->
        <b-nav-item :to="localePath({name: 'admin-products'})">Products</b-nav-item>
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
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
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
      // this.$notifier.showMessage({ message: ['You successful logged out!'], type: 'success' })
      // this.$router.push(this.localePath({ name: 'index' }));
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
