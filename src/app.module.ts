import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { AlarmGateway } from './alarm/alarm.gateway';
import { RoomchatGateway } from './roomchat/roomchat.gateway';

@Module({
  controllers: [AppController],
  providers: [AppService, ChatGateway, AlarmGateway, RoomchatGateway],
})
export class AppModule {}
