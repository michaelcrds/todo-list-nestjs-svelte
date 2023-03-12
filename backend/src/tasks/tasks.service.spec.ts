import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createTaskDtoMock } from '../testing/create-task-dto.mock';
import { taskListMock } from '../testing/task-entity-list.mock';
import { taskRepositoryMock } from '../testing/task-repository.mock';
import { updateTaskDtoMock } from '../testing/update-task-dto.mock';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, taskRepositoryMock],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskRepository = module.get(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(taskRepository).toBeDefined();
  });

  describe('Create', () => {
    it('should return a task obj', async () => {
      const result = await service.create(createTaskDtoMock);
      expect(result).toEqual(taskListMock[0]);
    });
  });

  describe('Read', () => {
    it('should return a list of task', async () => {
      const result = await service.findAll();
      expect(result).toEqual(taskListMock);
    });

    it('should return one task', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(taskListMock[0]);
    });
  });

  describe('Update', () => {
    it('should return a task obj updated', async () => {
      const result = await service.update(1, updateTaskDtoMock);
      expect(result).toEqual(taskListMock[0]);
    });
  });

  describe('Delete', () => {
    it('should return a status 200', async () => {
      const result = await service.remove(1);
      expect(result.status).toEqual(200);
    });
  });
});
