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
  serverMiddleware: [
    // <project root>/api/index.js 모듈을 미들웨어로 추가
    '~/server/api/index.js',
  ],  
  sourcemap: {
    server: false,
    client: false
  },
})
