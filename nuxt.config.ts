import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        // @ts-ignore
        config.plugins.push(
          vuetify({
            autoImport: true,
            styles: {
              configFile: 'assets/scss/settings.scss'
            }
          })
        )
      )
    }
  ],  
  extends: [
    '@nuxt/examples-ui'
  ],
  sourcemap: {
    server: false,
    client: false
  },
})
