import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  
  // Increase the body parser limit
  app.useBodyParser('json', { limit: '50mb' });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
