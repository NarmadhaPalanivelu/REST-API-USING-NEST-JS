import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line prettier/prettier
import { ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line prettier/prettier
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
