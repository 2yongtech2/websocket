import type { Peer, Message } from 'crossws'

const room = 'ROOM' // 방 id or 프로젝트 id or 게시물 id
export default defineWebSocketHandler({
  open(peer) {
    console.log('opened WS', peer)
    peer.subscribe(room)
    // const joinMessage = {
    //   type: 'join',
    //   content: 'Another user joined the chat',
    //   time: new Date().toISOString()
    // };
    // peer.publish(room, JSON.stringify(joinMessage))
  },
  close(peer) {
    console.log('closed WS', peer)
  },
  error(peer, error) {
    console.log('error on WS', peer, error)
  },
  message(peer, message) {
    console.log('message on WS', peer, message)
    peer.send(message.text()) // 보낸 메시지를 다시 돌려보내기
    peer.publish(room, message.text())
  }
});
// function onCalc(peer: Peer, message: Message) {
//   if(message.text().startsWith('calc ')){
//     const equation = message.text().replace('calc ', '')
//     // TODO: UNSAFE - DO NOT DO IN PROD, CAN LEAD TO XSS/RCI
//     const result = eval(equation)
//     peer.send(`The result of "${equation}" is: ${result}`)
//   }
// }