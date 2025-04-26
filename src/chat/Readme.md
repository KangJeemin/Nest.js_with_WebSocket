```
📱 Client                        🖥️ NestJS 서버 (3000번 포트)
   │                                     │
   │  io('http://localhost:3000')        │
   ├──────────── socket 연결 요청 ──────▶│
   │                                     │
   │                            (1) WebSocketAdapter 가 감지
   │                            (2) @WebSocketGateway() 등록된 클래스 찾음
   │                            (3) gateway.handleConnection(client) 호출
   │
   │  socket.emit('message', data)       │
   ├──────────── message 이벤트 ───────▶│
   │                            (4) @SubscribeMessage('message') 함수 실행

```
