export default {
    server: {
        port: 6000, // default: 3000
        host: (process.env.NODE_ENV === 'production')?'peterma.website':'0.0.0.0' // default: localhost
    },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'peterma-website',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  serverMiddleware: [
    '~/api/index.js',
  ],
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
      { src: '@/plugins/vueMarkdown.js', ssr: false },
      { src: '@/plugins/fontawesome.js', ssr: false },
      { src: '@/plugins/simpleAlert.js', ssr: false },
      { src: '@/plugins/vueWindow.js', ssr: false },
      '~/plugins/axiosInit',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
      vendor: [
          'ol',
      ],
      extend (config, { isDev, isClient }) {
          config.node = {
              fs: 'empty'
          }
      }
  }
}
