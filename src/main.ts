import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { networkInterfaces } from 'os';

async function bootstrap() {
  const net = networkInterfaces();
  const ipAddress = net['en0'].find((x) => x.family === 'IPv4').address;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, ipAddress);
}
bootstrap();
