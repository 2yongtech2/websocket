<template>
  {{ userId }}
  <div class="wrap-chat">
    <input v-model="nickname" placeholder="내 이름 입력">

    <div class="box-chat" ref="chatBoxRef">
      <div 
        v-for="(entry, index) in history" 
        :key="index"
      >
        <p class="joined" v-if="entry.type === 'join'">
          {{ entry.userId }} 님이 입장하셨습니다.
        </p>
        <div class="message right" v-else-if="entry.userId === userId && entry.type !== 'join'">
          <div class="box-balloon">
            <span class="date">
              {{ entry.date }}
            </span>
            <p class="balloon-message">
              {{ entry.content }}
            </p>
          </div>
        </div>
        <div class="message left" v-else-if="entry.userId !== userId && entry.type !== 'join'">
          <div class="thumbnail"></div>
          <div>
            <span class="nickname">
              {{ entry.nickname }}
            </span>
            <div class="box-balloon">
              <p class="balloon-message">
                {{ entry.content }}
              </p>
              <span class="date">
                {{ entry.date }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box-input">
      <input v-model="message" placeholder="메세지 입력" name="inputText" @keyup.enter="sendMessage">
      <button @click="sendMessage">Send</button>
    </div>
  </div>
  {{ data }}
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'; // UUID 생성을 위한 라이브러리

const userId = uuidv4(); // 고유한 유저 ID 생성
const nickname = ref(''); // 사용자의 닉네임
const message = ref(''); // 메시지 입력란
const history = ref<any[]>([]);
const chatBoxRef = ref<HTMLElement | null>(null);
// WebSocket 설정
const { status, data, send, open, close } = useWebSocket(`ws://${location.host}/api/websocket`, {
  onConnected: () => {
    console.log('WebSocket opened');
    send(JSON.stringify({ type: 'join', userId: userId }));
  },
  onDisconnected: () => {
    console.log('WebSocket closed');
  },
  onMessage: (event) => {
    console.log('WebSocket message received:', event.data);
  },
  onError: (event) => {
    console.error('WebSocket error:', event);
  },
});

onMounted(() => {
  scrollToBottom();
});
watch(data, (newValue : any) => {
  //newValue가 string이므로 JSON.parse를 통해 객체로 변환
  const messageObject = JSON.parse(newValue);
  if(messageObject.type === 'join'){
    history.value.push(messageObject)
  }
  else{
    messageObject.date = formatMessageDate(messageObject.date);
    history.value.push(messageObject)
  }
});

watch(history.value, (newValue: any) => {
  // nextTick은 다음 DOM 업데이트 사이클로 작업을 예약
  nextTick(() => {
    scrollToBottom();
  });
})

const sendMessage = () => {
  const messageObject = { 
    type: 'message',
    userId: userId,
    nickname: nickname.value, 
    content: message.value,
    date: new Date().toISOString() 
  };
  send(JSON.stringify(messageObject));
  messageObject.date = formatMessageDate(messageObject.date);
  // 원래는 클라이언트에서 메시지를 보내면 바로 화면에 띄우게 했었음 서버에서 받아서 다시 보내는 걸로 수정
  // history.value.push(messageObject);
  message.value = ''; // 메시지 입력란 비우기
}

const formatMessageDate = (dateString : string) => {
  const messageDate = new Date(dateString);
  const today = new Date();
  if (
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()
  ) {
    // If message date is today, return only time
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    // If message date is not today, return only date
    return messageDate.toLocaleDateString();
  }
}

const scrollToBottom = () => {
  if (chatBoxRef.value) {
    chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight ;
    console.log(chatBoxRef.value.scrollHeight);
  }
}

</script>

<style lang="scss" scoped>
.wrap-chat{
  width: 300px;
  height: 400px;
  border: 1px solid black;
  overflow-y: scroll;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: #BACEE0;
  display: flex;
  flex-direction: column;
  .box-chat{
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    margin: 24px 0;
    .joined{
        font-size: 12px;
        background: rgba(255,255,255,0.3);
        border-radius: 4px;
        padding: 4px 8px;
      }
    .message{
      display: flex;
      margin-bottom: 12px;
      
      .date{
        font-size: 10px;
        color: gray;
        margin: 0 4px;
      }
      .nickname{
        font-size: 12px;
        margin-bottom: 4px;
        display: block;
      }
      .thumbnail{
        width: 44px;
        height: 44px;
        background: gray;
        border-radius: 16px;
        margin-right: 5px;
        min-width: 44px;
      }
      .box-balloon{
        display: flex;
        align-items: flex-end;

        .balloon-message{
          background: #fff;
          padding: 5px;
          border-radius: 5px;
          max-width: 60%;
          margin: 0;
          font-size: 12px;
          border: 1px solid #9EAFBF;
          word-break: break-all;
        }
      }
    }
    .right{
      justify-content: flex-end;
      .box-balloon{
        justify-content: flex-end;
        .balloon-message{
          background: #FFEB33;
        }
      }
    }
    .left{
      justify-content: flex-start;
      
    }
  }
  .box-input{
    display: flex;
    input{
      flex: 1;
    }
  }
  .box-user{

  }
}
</style>
