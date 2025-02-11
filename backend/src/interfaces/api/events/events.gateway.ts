import { Run } from '@/core/entities/run';
import { Task, TaskAction } from '@/core/entities/task';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RunAdapter } from '../adapters/run-adapter';
import { text } from 'stream/consumers';

@WebSocketGateway({ cors: { origin: '*' } }) // Allow all origins for development
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe')
  async handleMessage(@MessageBody() data: void) {
    const run = Run.InitPending();

    this.server.emit('runData', RunAdapter.toFrontend(run));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const task = Task.InitPending('Close the door', [
      {
        name: 'clickElement',
        params: {
          index: 0,
        },
        description: 'Click the close button',
      },
    ]);

    run.addTask(task);

    this.server.emit('runData', RunAdapter.toFrontend(run));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    task.complete();

    this.server.emit('runData', RunAdapter.toFrontend(run));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const task2 = Task.InitPending('Fill the email form', [
      {
        name: 'fillInput',
        params: {
          index: 0,
          text: 'test@test.com',
        },
        description: 'Fill the email input',
      },
      {
        name: 'fillInput',
        params: {
          index: 1,
          text: 'password',
        },
        description: 'Fill the password input',
      },
    ]);

    run.addTask(task2);

    this.server.emit('runData', RunAdapter.toFrontend(run));
  }
}
