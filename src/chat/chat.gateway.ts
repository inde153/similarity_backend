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
import * as moment from 'moment';

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
  private comments = [];

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
  handleMessage(client: Socket, data): any {
    const timestamp = moment(new Date()).format('HH:mm:ss');
    const username = data.username;

    const messageData = {
      id: client.id, // or generate a unique ID for the message
      email: data.email,
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

    this.server.emit('getMessage', messageData);

    return 'ok';
  }
}
