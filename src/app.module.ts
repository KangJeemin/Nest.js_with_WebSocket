import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ChatModule], // ChatModule에 있는 provider가 자동으로 주입됨
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
