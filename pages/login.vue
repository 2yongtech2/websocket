<template>
<input type="text" v-model="email" placeholder="Email" />
<input type="text" v-model="password" placeholder="Password" />
<button @click="login">Login</button>
{{ errorMessage }}
</template>

<script lang="ts" setup>
import { supabase } from '@/utils/supabase'
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  const { user, session } = data
  if (error) {
    console.error('Error logging in:', error.message)
    errorMessage.value = error.message
  } else {
    console.log('User:', user)
    console.log('Session:', session)
  }
}
</script>

<style lang = "scss" scoped>

</style>