import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/roomchat', cors: true })
export class RoomchatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`✅ 클라이언트 연결됨: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ 클라이언트 연결 끊김: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    // 내부적으로, 소켓 서버는 방을 식별할 수 있는 키(방 이름)와 해당 방에 참여 중인 소켓 ID 목록을 관리
    client.join(room);
    console.log(`🚪 ${client.id}가 방 [${room}]에 입장`);
    client.emit('joinedRoom', `방 [${room}]에 입장했습니다.`);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody()
    data: { room: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`💬 ${client.id} -> 방 [${data.room}]: ${data.message}`);
    // 자기 자신 제외하고 방에 있는 사람들에게 메시지 전송
    client.to(data.room).emit('newMessage', data.message);

    //모든 방에 있는 사람들에게 전송(전체메세지)
    // this.server.emit('newMessage',data.message)
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() currentRoom:string,
    @ConnectedSocket() client: Socket){
      client.leave(currentRoom);

      console.log(`⚡️ ${client.id} -> 방 [${currentRoom}] 퇴장`);

      client.emit('leftRoom', `방 [${currentRoom}]에서 퇴장했습니다.`);
       client.to(currentRoom).emit('newMessage', `${client.id}님이 퇴장하셨습니다.`);
    }
}
