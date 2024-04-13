// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app:{
    baseURL: '/websocket/'
  },
  modules: ['@vueuse/nuxt'],
  nitro: {
    experimental: {
      websocket: true
    }
  }
})
