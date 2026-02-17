import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
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
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Optional
        name: 'JWT', // Name of the header
        description: 'Enter JWT token',
        in: 'header',
      },
      'access_token', // This name must match the one used in the decorator
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  documentFactory.security = [{ access_token: [] }];
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  app.useGlobalInterceptors(
    new ResponseInterceptor(), // Formating Data Response
    new SnakeCaseInterceptor(), // Mapping snakecase for APIs Response
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  await app.listen(process.env.APP_PORT || 4003);
}
bootstrap();
