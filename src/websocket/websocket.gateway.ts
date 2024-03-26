import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'events' })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log("helloooooooo");
    this.server.emit('event', 'hey')
    return 'Hello world!';
  }
}