<template>
  <input type="text" v-model="email" placeholder="Email" />
  <p v-if="invalidEmail">이메일 형식이 이상함</p>
  <input type="password" v-model="password" placeholder="Password" />
  <p v-if="passwordLength">비밀번호는 8자 이상이어야 함</p>
  <p v-if="invalidPassword">비밀번호는 문자와 숫자를 포함해야 함</p>
  <button @click="signUp">Sign Up</button>
  </template>
  
  <script lang="ts" setup>
  import { supabase } from '@/utils/supabase'

  const email = ref('')
  const password = ref('')
  const invalidEmail = ref(false)
  const passwordLength = ref(false)
  const invalidPassword = ref(false)
  
  const signUp = async () => {
    // 이메일이 유효한지 확인
    if (!email.value.includes('@')) {
      invalidEmail.value = true
      console.error('Invalid email')
      return
    }
    invalidEmail.value = false
  
    // 비밀번호가 8자 이상인지 확인
    if (password.value.length < 8) {
      passwordLength.value = true
      console.error('Password must be at least 8 characters')
      return
    }
    passwordLength.value = false
  
    // 비밀번호가 숫자, 문자를 포함하는지 확인
    if (!/\d/.test(password.value) || !/[a-zA-Z]/.test(password.value)) {
      invalidPassword.value = true
      console.error('Password must contain at least one letter and one number')
      return
    }
    invalidPassword.value = false
    
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          name: '',
        },
      },
    })
    if (error) {
      console.error(error)
    } else {
      console.log('Sign up successful', data)
    }
  }
  </script>
  
  <style lang = "scss" scoped>
  
  </style>