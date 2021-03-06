import fs from 'fs';

export default {
    server: (process.env.NODE_ENV === 'production')
        ? {
        https:  {
            key: fs.readFileSync('/etc/letsencrypt/live/peterma.website/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/peterma.website/fullchain.pem')
        },
        port: 3000,
        host: '0.0.0.0'
    } : {
        port: 3000,
        host: 'localhost'
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
