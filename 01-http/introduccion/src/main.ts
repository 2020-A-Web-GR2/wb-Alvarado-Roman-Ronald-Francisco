import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //Importar cosas en TS
const cookieParser = require('cookie-parser'); //Importar cosas en JS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // pm run start:dev

  app.use(cookieParser())
  await app.listen(3000);
}
bootstrap();
