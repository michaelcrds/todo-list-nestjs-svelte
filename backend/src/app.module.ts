import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    /*
      Para maior segurança de dados como usuário, senhas, chaves sercretas, entre outros dados sensíveis 
      é altamente recomendavel o uso de váriaveis de ambiente.

      configurando variavéis de ambiente
    */
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
