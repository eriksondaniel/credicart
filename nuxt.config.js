import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/vuetify',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      primary: colors.indigo.darken3,
      accent: colors.blue.darken4,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.blueGrey.darken4
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  env: {
    fbApiKey: 'AIzaSyDpHzF4iy6LTt7Z6WlGSw-Um68A9iqb4CE',
    // loginAPI: 'http://localhost:4000/login/',
    // clientesAPI: 'http://localhost:4000/clientes/',
    // creditosClienteAPI: 'http://localhost:4000/creditosCliente/',
    // calculaAPI: 'http://localhost:4000/calcula/',
    // creditosAPI: 'http://localhost:4000/creditos/'

    loginAPI: 'https://credicart-api.herokuapp.com/login/',
    clientesAPI: 'https://credicart-api.herokuapp.com/clientes/',
    creditosClienteAPI: 'https://credicart-api.herokuapp.com/creditosCliente/',
    calculaAPI: 'https://credicart-api.herokuapp.com/calcula/',
    creditosAPI: 'https://credicart-api.herokuapp.com/creditos/'
  }
}
