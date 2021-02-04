import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationConfig } from './configs/validation-config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationConfig));

  const config = new DocumentBuilder()
    .setTitle('Exam App')
    .setDescription('Exam App')
    .setVersion('1.0')
    .addTag('exams')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
