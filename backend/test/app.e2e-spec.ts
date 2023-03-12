import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { createTaskDtoMock } from '../src/testing/create-task-dto.mock';
import { Task } from '../src/tasks/entities/task.entity';
import { updateTaskDtoMock } from '../src/testing/update-task-dto.mock';

/*
  Até o momento, eu não consegui utilizar as migrações no NestJs. 
  Em vez disso, eu realizei testes de ponta a ponta (e2e) usando o mesmo banco de dados de produção. 
  No entanto, isso pode causar problemas, pois se os testes forem executados mais de uma vez, 
  o registro com ID 1 será excluído na primeira execução e poderá causar erros 
*/
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/tasks (POST)', async () => {
    const result = await request(app.getHttpServer())
      .post('/tasks')
      .send(createTaskDtoMock);

    expect(result.statusCode).toEqual(201);
    expect(typeof result.body).toEqual(typeof new Task());
  });

  it('/tasks (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/tasks');

    expect(result.statusCode).toEqual(200);
    expect(typeof result.body).toEqual(typeof new Array<Task>());
  });

  it('/tasks/1 (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/tasks/1');

    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.id).toEqual('number');
  });

  it('/tasks/1 (PATCH)', async () => {
    const result = await request(app.getHttpServer())
      .patch('/tasks/1')
      .send(updateTaskDtoMock);

    expect(result.statusCode).toEqual(200);
    expect(typeof result.body).toEqual(typeof new Task());
  });

  it('/tasks/1 (DELETE)', async () => {
    const result = await request(app.getHttpServer()).delete('/tasks/1');

    expect(result.statusCode).toEqual(200);
    expect(result.body.message).toEqual('Task deleted');
  });
});
