import { Task } from '../tasks/entities/task.entity';

export const taskListMock: Task[] = [
  {
    id: 1,
    title: 'test1',
    description: 'test description',
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'test2',
    description: 'test description',
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: 'test3',
    description: 'test description',
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
