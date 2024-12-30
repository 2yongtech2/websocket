<template>
  <header>
    <nuxt-link to="/">LOGO</nuxt-link>
    <div class="d-flex">
      <nuxt-link to="/login" v-if="!isLoggedIn">로그인</nuxt-link>
      <button v-else-if="isLoggedIn" @click="logout">로그아웃</button>
      {{ userName }}
    </div>
  </header>
</template>

<script lang="ts" setup>
import { supabase } from '@/utils/supabase'
import { storeToRefs } from 'pinia'
import userStore from '@/stores/user'

const useUserStore = userStore()
const { user } = storeToRefs(useUserStore())

const userName = useUserStore.userName
// 컴포넌트가 마운트되었을 때 로그인 여부 확인
onMounted(async () => {
  // checkLoginStatus()
})

</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #333;
  color: white;
}

.d-flex{
  display: flex;
  gap: 1rem;
}
</style>