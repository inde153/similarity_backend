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
import { ChatInputDTO, ChatOutputDTO } from './dtos/chat.dto';
import * as moment from 'moment';
import { SetInitInputDTO, SetInitOutputDTO } from './dtos/setInit.dto';

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
  handleSetInit(
    client: Socket,
    setInitInputDTO: SetInitInputDTO,
  ): SetInitOutputDTO {
    let username = setInitInputDTO.username;
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
  getOldComments(client: Socket): ChatOutputDTO[] {
    return this.comments.slice(-50);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, chatInputDTO: ChatInputDTO): void {
    const timestamp = moment(new Date()).format('HH:mm:ss');
    const username = chatInputDTO.username;

    const messageData = {
      id: client.id, // or generate a unique ID for the message
      email: chatInputDTO.email,
      username: username,
      message: chatInputDTO.message,
      date: timestamp,
    };

    if (this.comments.length <= 100) {
      this.comments.push(messageData);
    } else {
      this.comments.shift();
      this.comments.push(messageData);
    }

    this.server.emit('getMessage', messageData);
  }
}
