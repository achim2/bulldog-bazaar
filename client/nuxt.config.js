export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Bulldog bazaar',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/styles.scss',
    // '~node_modules/bootstrap/dist/css/bootstrap.css',
    // '~node_modules/bootstrap-vue/dist/bootstrap-vue.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/notifier',
    '~/plugins/axios',
    '~/plugins/dateFilter',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt',
  ],

  styleResources: {
    scss: [
      // './assets/scss/*.scss',
      '@/assets/scss/_variables.scss',
      '@/node_modules/bootstrap/scss/_functions.scss',
      '@/node_modules/bootstrap/scss/_variables.scss',
      '@/node_modules/bootstrap/scss/mixins/_breakpoints.scss',
    ]
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  axios: {
    // baseURL: ``, //built by docker compose from API_PORT && API_HOST variables
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/auth/user', method: 'get', propertyName: 'user' },
        },
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'product-edit',
          path: '/admin/products/edit/:id',
          component: 'pages/admin/products/add.vue',
        },
        {
          name: 'product-image-upload',
          path: '/admin/products/upload-images/:id',
          component: 'pages/admin/products/imageUpload.vue',
        },
      )
    }
  },


  env: {
    baseUrl: `${process.env.BASE_URL}`,
    imagePath: `${process.env.BASE_URL}:${process.env.API_PORT}/uploads`,
  },

  publicRuntimeConfig: {
    baseUrl: `${process.env.BASE_URL}`,
    imagePath: `${process.env.BASE_URL}:${process.env.API_PORT}/uploads`,
  },

  loading: '~/components/LoadingBar.vue',
}
