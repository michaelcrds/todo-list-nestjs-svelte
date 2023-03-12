import { Test, TestingModule } from '@nestjs/testing';
import { createTaskDtoMock } from '../testing/create-task-dto.mock';
import { taskListMock } from '../testing/task-entity-list.mock';
import { taskServiceMock } from '../testing/task-service.mock';
import { updateTaskDtoMock } from '../testing/update-task-dto.mock';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [taskServiceMock],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should return a task obj', async () => {
      const result = await controller.create(createTaskDtoMock);
      expect(result).toEqual(taskListMock[0]);
    });
  });

  describe('Read', () => {
    it('should return a list of task', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(taskListMock);
    });

    it('should return one task', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(taskListMock[0]);
    });
  });

  describe('Update', () => {
    it('should return a task obj updated', async () => {
      const result = await controller.update(1, updateTaskDtoMock);
      expect(result).toEqual(taskListMock[0]);
    });
  });

  describe('Delete', () => {
    it('should return a status 200', async () => {
      const result = await controller.remove(1);
      expect(result.status).toEqual(200);
    });
  });
});
