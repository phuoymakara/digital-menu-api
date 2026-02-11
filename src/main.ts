import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/http/response-interceptor';
import { SnakeCaseInterceptor } from './common/http/snakecase-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  );
  app.enableCors(); 
  app.useGlobalInterceptors(
    new ResponseInterceptor(), // Formating Data Response
    new SnakeCaseInterceptor(), // Mapping snakecase for APIs Response
  );
  await app.listen(3000);
}
bootstrap();
