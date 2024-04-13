<template>
  <div>
    <input v-model="myName" placeholder="내 이름 입력">
    <form @submit.prevent="sendData">
      <input v-model="message" placeholder="메세징 입력">
      <button type="submit">Send</button>
    </form>
    <div>
      <p v-for="entry in history" :key="entry">{{ entry }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'; // UUID 생성을 위한 라이브러리

const userId = uuidv4(); // 고유한 유저 ID 생성
const myName = ref(''); // 내 이름
// WebSocket 설정
const { status, data, send, open, close } = useWebSocket(`ws://${location.host}/api/websocket`, {
  onOpen: () => {
    // 연결이 열리면 서버에 userId를 전송
    send(JSON.stringify({ type: 'userId', data: userId }));
  }
});

const history = ref<string[]>([]);
watch(data, (newValue : any) => {
  history.value.push(`server: ${newValue}`);
});

const message = ref('');
function sendData(){
  history.value.push(`client: ${message.value}`);
  send(message.value);
  message.value = '';
}
</script>
