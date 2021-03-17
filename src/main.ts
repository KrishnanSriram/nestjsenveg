import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {  utilities as nestWinstonModuleUtilities, WinstonModule } from "nest-winston";
import * as winston from 'winston';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const REDIS_HOST = configService.get<string>('REDIS_HOST');
  const REDIS_PORT = configService.get<number>('REDIS_PORT');
  const microserviceOptions = {
    transport: Transport.REDIS,
    options: {
      url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    },
  };
  app.connectMicroservice(microserviceOptions);
  const CHANNEL = configService.get<number>('SUBSCRIBE_CHANNEL');
  const environment = configService.get<string>('NODE_ENV');
  const title = configService.get<string>('ENVIRONMENT_TITLE');
  app.startAllMicroservices(() => {
    logger.log(
      `${environment}, Microservice ready to receive Redis messages in - ${CHANNEL}\n Environment - ${title}`,
    );
  });
}
bootstrap();
