import { Controller, Get, Inject, Logger } from "@nestjs/common";
import { MessagePattern, RedisContext, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import * as Redis from 'redis';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  private client = Redis.createClient();
  constructor(private readonly appService: AppService) {

  }

  @MessagePattern('hello')
  getHello(): string {
    const response = this.appService.getHello();
    this.logger.log(response);
    this.client.publish('contentpersist', response);
    return response;
  }
}
