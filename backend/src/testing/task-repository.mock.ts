import { HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { taskListMock } from './task-entity-list.mock';
//import { taskListMock } from './task-entity-list.mock';

export const taskRepositoryMock = {
  provide: getRepositoryToken(Task),
  useValue: {
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(taskListMock[0]),
    find: jest.fn().mockResolvedValue(taskListMock),
    findOneBy: jest.fn().mockResolvedValue(taskListMock[0]),
    delete: jest.fn().mockResolvedValue({
      status: HttpStatus.OK,
      message: 'Task deleted',
    }),
  },
};
