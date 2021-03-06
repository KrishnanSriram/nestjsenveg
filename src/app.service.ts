import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Redis from 'redis';

@Injectable()
export class AppService {
  private logger = new Logger('AppService');
  // private client = new Redis.redis();

  constructor(private configService: ConfigService) {}
  getHello(): string {
    const channel = this.configService.get('PERSIST_CHANNEL');
    this.logger.log(`Send message over ${channel}`);
    // this.client.publish(channel, 'Hello World');
    return 'Hello World!';
  }
}
