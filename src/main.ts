import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/http/response-interceptor';
import { SnakeCaseInterceptor } from './common/http/snakecase-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  );
  app.enableCors(); 
   const config = new DocumentBuilder()
    .setTitle('E-Menu APIs')
    .setDescription('The E-Menu APIs')
    .setVersion('1.0')
    .addTag('e-menu')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalInterceptors(
    new ResponseInterceptor(), // Formating Data Response
    new SnakeCaseInterceptor(), // Mapping snakecase for APIs Response
  );
  await app.listen(3000);
}
bootstrap();
