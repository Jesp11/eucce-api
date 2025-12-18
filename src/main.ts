import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes( new ValidationPipe({
      whitelist: true,         
      forbidNonWhitelisted: true,
      transform: true,         
  }));
  setupSwagger(app);
  app.enableCors();
  const PORT = process.env.PORT || 8080;
  await app.listen(PORT, '0.0.0.0');
  
  console.log(`Application is running on: http://localhost:${PORT}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
  }
}
bootstrap();
