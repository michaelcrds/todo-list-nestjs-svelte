import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Class validator
  app.useGlobalPipes(new ValidationPipe());

  /* 
    CORS (Cross-origin Resource Sharing) é um mecanismo de segurança
    para compartilhamento de recursos entre diferentes origens.
    
    Aqui estou usando a configuração padrão, mas em um caso real 
    poderiamos restrigir o acesso da API para apenas dominios que pertence a VLGI.
  */
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
