export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Icon Bulls',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A website about french bulldogs.' }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600&display=swap' },

      { rel: 'apple-touch-icon', type: 'image/png', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '192x192', href: '/favicon/apple-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'manifest', href: '/favicon/manifest.json' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ffffff' },
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
    '~/plugins/loading',
    '~/plugins/storage',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    'nuxt-lazysizes', //https://github.com/ivodolenc/nuxt-lazysizes
    '@aceforth/nuxt-optimized-images', //https://github.com/juliomrqz/nuxt-optimized-images //only build
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
    'nuxt-i18n',
    'bootstrap-vue/nuxt',
  ],

  serverMiddleware: [
    '~/middleware/logger'
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
    bootstrapVueCSS: false,
    icons: true,
  },

  axios: {
    baseURL: `${process.env.BASE_URL}/${process.env.API_PREFIX}/`,
  },

  env: {
    baseUrl: `${process.env.BASE_URL}/${process.env.API_PREFIX}/`,
    imagePath: `${process.env.BASE_URL}/${process.env.API_PREFIX}/uploads`,
  },

  publicRuntimeConfig: {
    baseUrl: `${process.env.BASE_URL}`,
    imagePath: `${process.env.BASE_URL}/${process.env.API_PREFIX}/uploads`,
  },

  // https://axios.nuxtjs.org/options/
  privateRuntimeConfig: {
    axios: {
      baseURL: 'http://nginx/api' // name of the docker proxy
    }
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
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/admin/products',
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      compact: true,
    },
  },

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
          path: '/admin/products/product-image-upload/:id',
          component: 'pages/admin/products/product-image-upload.vue',
        },
        {
          name: 'gallery-image-upload',
          path: '/admin/gallery-image-upload',
          component: 'pages/admin/gallery-image-upload.vue',
        },
      );
    }
  },

  loading: '~/components/LoadingBar.vue',

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js' },
      { code: 'hu', iso: 'hu-HU', file: 'hu.js' },
      { code: 'de', iso: 'de-DE', file: 'de.js' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: '/i18n/',
    parsePages: false,
    vueI18n: {
      fallbackLocale: 'en',
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    seo: false,
    vueI18nLoader: true,
    strategy: 'no_prefix',
  },

  lazySizes: {
    extendAssetUrls: {
      img: 'data-src',
      source: 'data-srcset',
      // Component with custom props
      AppImage: ['source-md-url', 'image-url'],
    },
  },

  optimizedImages: {
    inlineImageLimit: 1000,
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: false,
    optimizeImagesInDev: false,
    defaultImageLoader: 'img-loader',
    mozjpeg: {
      quality: 80,
    },
    optipng: {
      optimizationLevel: 3,
    },
    pngquant: false,
    gifsicle: {
      interlaced: true,
      optimizationLevel: 3,
    },
    svgo: {
      // enable/disable svgo plugins here
    },
    webp: {
      preset: 'default',
      quality: 75,
    },
  },
};
