<template>
  <header>
    <div class="container">
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand :to="localePath({name: 'index'})">
          <Logo/>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="localePath({name: 'index'})">{{ $t('home') }}</b-nav-item>
            <b-nav-item :to="localePath({name: 'gallery'})">{{ $t('gallery') }}</b-nav-item>
            <b-nav-item :to="localePath({name: 'breed'})">{{ $t('breed') }}</b-nav-item>
            <b-nav-item :to="localePath({name: 'transport'})">{{ $t('transport') }}</b-nav-item>
            <b-nav-item :to="localePath({name: 'about'})">{{ $t('about') }}</b-nav-item>
            <b-nav-item :to="localePath({name: 'contact'})">{{ $t('contact') }}</b-nav-item>

            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown :text="$i18n.locale" right>
              <b-dropdown-item
                v-for="locale in availableLocales"
                :key="locale.code"
                @click="setLocale(locale.code)"
              >{{ locale.code }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav class="navbar-nav--admin" v-if="$auth.loggedIn">
            <b-nav-item-dropdown :text="$auth.user.name" right>
              <b-dropdown-item :to="localePath({name: 'admin-products'})">Products</b-dropdown-item>
              <b-dropdown-item :to="localePath({name: 'admin'})">Page info</b-dropdown-item>
              <b-dropdown-item :to="localePath({name: 'admin-gallery-image-upload'})">Gallery</b-dropdown-item>
              <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
  </header>
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
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  },
  methods: {
    setNavbarScroll() {
      let prevScrollpos = window.pageYOffset;
      const navbar = document.querySelector('nav.navbar');
      const navbarHeight = navbar.offsetHeight;

      window.onscroll = function () {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          navbar.style.top = '0';
        } else {
          navbar.style.top = -navbarHeight + 'px';
        }
        prevScrollpos = currentScrollPos;
      };
    },
    async logout() {
      await this.$auth.logout();
      // this.$notifier.showMessage({ message: ['You successful logged out!'], type: 'success' })
      // this.$router.push(this.localePath({ name: 'index' }));
    },
    setLocale(code) {
      this.$i18n.setLocale(code);
      this.$storage.setLocale(code);
    },
  }
};
</script>

<style lang="scss">
header {
  background: $header;
}

.navbar,
.navbar.navbar-dark {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  transition: .25s ease;
  z-index: 100;

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

  .dropdown-menu {
    min-width: auto;
  }
}
</style>
