import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatOutputDTO, SetInitDTO } from './dtos/chat.dto';

@WebSocketGateway({
  namespace: 'chat',
  cors: { origin: '*' },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private logger = new Logger('ChatGateway');
  private comments = [
    {
      id: 'sfnjkaso3287snz',
      username: 'anonymous',
      message: '오 맞춤',
      date: new Date(),
    },
  ];

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('setInit')
  handleSetInit(client: Socket, payload: { username: string }): SetInitDTO {
    let username = payload.username;
    client.data.username = username;

    return {
      username: username,
      room: {
        roomId: 'room:lobby',
        roomName: '로비',
      },
    };
  }

  @SubscribeMessage('getOldComments')
  getOldComments(client: Socket, test: string): ChatOutputDTO[] {
    return this.comments.slice(-10);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, data): void {
    const timestamp = new Date();
    const username = data.username;

    const messageData = {
      id: client.id, // or generate a unique ID for the message
      username: username,
      message: data.message,
      date: timestamp,
    };

    if (this.comments.length <= 100) {
      this.comments.push(messageData);
    } else {
      this.comments.shift();
      this.comments.push(messageData);
    }

    client.broadcast.emit('getMessage', messageData); // or client.broadcast.emit to exclude the sender
  }
}
