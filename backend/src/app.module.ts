import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    /*
      Para maior segurança de dados como usuário, senhas, chaves sercretas, entre outros dados sensíveis 
      é altamente recomendavel o uso de váriaveis de ambiente.

      configurando variavéis de ambiente
    */
    ConfigModule.forRoot(),
    /*
      Conexão como o banco de dados
    */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Task],
      synchronize: true,
    }),
    /* 
      O thottler é uma solução do nestJs que usamos
      para ter um controle de quantos acessos nossa API pode receber e por quem,
      assim podemos evitar um ataque de DDoS.

      Aqui estou fazendo uma configuração padrão para toda a API
      mas poderiamos adicionar diferentes regras por modules ou end-points.
    */
    ThrottlerModule.forRoot({
      // A cada um minuto
      ttl: 60,
      // Podemos receber até 10 requisições em cada end-point
      limit: 10,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Adicionando o Thottler em toda aplicação
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
