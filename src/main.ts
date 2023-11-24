import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { setupSwagger } from './swagger';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  // TODO: 프로그램 구현

  setupSwagger(app);

  await app.listen(process.env.PORT || 8000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
