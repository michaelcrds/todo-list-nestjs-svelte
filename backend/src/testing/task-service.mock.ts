import { HttpStatus } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';
import { taskListMock } from './task-entity-list.mock';

export const taskServiceMock = {
  provide: TasksService,
  useValue: {
    create: jest.fn().mockResolvedValue(taskListMock[0]),
    findAll: jest.fn().mockResolvedValue(taskListMock),
    findOne: jest.fn().mockResolvedValue(taskListMock[0]),
    update: jest.fn().mockResolvedValue(taskListMock[0]),
    remove: jest.fn().mockResolvedValue({
      status: HttpStatus.OK,
      message: 'Task deleted',
    }),
  },
};
