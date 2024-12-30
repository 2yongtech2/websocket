import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

const useUserStore = defineStore('user',() =>{
  const isLoggedIn = ref(false) // 로그인 여부
  const userInfo = ref<any>(null) // 사용자 정보
  const logoutError = ref<string | null>(null) // 로그아웃 오류

  // 로그인 여부를 확인하는 함수
  const checkLoginStatus = async () => {
    const { data: session } = await supabase.auth.getSession()
    // 세션이 있으면 사용자가 로그인한 상태
    isLoggedIn.value = !!session.session
    if (isLoggedIn.value) {
      // public users에 있는 현재 로그인한 사용자의 이메일을 가져옴
      const { data: users, error } = await supabase
        .from('users')
        .select('name')
        .eq('id', session.session?.user.id)
        .single() // 단일 결과를 기대할 때 사용

      if (error) {
        console.error('사용자 정보 가져오기 실패:', error.message)
      } else {
        userInfo.value = users
      }
    }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      logoutError.value = error.message  // 로그아웃 실패 시 오류 메시지 저장
      console.error('로그아웃 실패:', error.message)
    } else {
      // 로그아웃 성공 시 로컬 스토리지에서 세션 삭제
      localStorage.removeItem('supabase.auth.token')
      isLoggedIn.value = false
      logoutError.value = null  // 로그아웃 성공 시 오류 메시지 초기화
      console.log('로그아웃 성공')
    }
  }
  return{
    isLoggedIn,
    userInfo,
    logoutError,
    checkLoginStatus,
    logout
  }
})
