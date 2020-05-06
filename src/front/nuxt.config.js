module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'admin_provider_panel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
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
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

// nuxt.config.js

  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',

    // With options
    ['@nuxtjs/vuetify', { /* module options */ }]
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  axios: {
    baseURL: "http://localhost:3001/"
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 1800,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'token',
          maxAge: 604800
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: 'api/customer/login', method: 'post'},
          refresh: { url: 'api/customer/token', method: 'post' },
          user: { url: 'api/users/me', method: 'get'},
        },
        // tokenRequired: true,
        // tokenType: 'Bearer',
        // autoFetchUser: false
      },

    },
    autoRefresh: {
      enable: true
    },
    redirect: {
      login: '/auth',
      logout: '/',
      callback: '/admin/dashboard',
      home: '/admin/dashboard',
    },
  },

    /*
    ** Build configuration
    */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

