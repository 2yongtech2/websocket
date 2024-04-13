// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@vueuse/nuxt'],
  nitro: {
    experimental: {
      websocket: true
    }
  }
})
