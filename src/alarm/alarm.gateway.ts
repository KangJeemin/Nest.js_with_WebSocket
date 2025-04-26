import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';



@WebSocketGateway({namespace : 'alarm', cros : true})
export class AlarmGateway implements OnGatewayConnection,OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    console.log(`🔵 Client Alarm connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`🔴 Client Alarm disconnected: ${client.id}`);
  }

  @SubscribeMessage('alarm')
  handleNotify(@MessageBody() alarm: boolean){
    console.log('[Alarm] 알림 수신:', alarm);
    this.server.emit('alarm', alarm); // 모든 클라이언트에 메시지 브로드캐스트
  }
}
