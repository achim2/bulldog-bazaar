export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Icon Bulls',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A website about french bulldogs.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600&display=swap' },
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

  env: {
    baseUrl: `${process.env.BASE_URL}`,
    imagePath: `${process.env.BASE_URL}:${process.env.API_PORT}/uploads`,
  },

  publicRuntimeConfig: {
    baseUrl: `${process.env.BASE_URL}`,
    imagePath: `${process.env.BASE_URL}:${process.env.API_PORT}/uploads`,
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
