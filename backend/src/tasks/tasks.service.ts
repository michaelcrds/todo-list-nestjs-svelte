import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    // Task repository
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    let taskToCreate: Task = new Task();

    taskToCreate.title = createTaskDto.title;
    taskToCreate.description = createTaskDto.description || '';
    taskToCreate.done = false;

    taskToCreate = await this.taskRepository.create(taskToCreate);

    return this.taskRepository.save(taskToCreate);
  }

  findAll() {
    return this.taskRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const task: Task = await this.taskRepository.findOneBy({ id });

    // Verificando se a task em questão é um objeto válido
    if (task === null) {
      // Caso não seja válido uma exceção é enviada como resposta
      throw new NotFoundException(`Task ${id} não encontrada`);
    }

    return this.taskRepository.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    /* 
      Usando nosso método findOne podemos além de buscar a task no banco de dados
      podemos verificar se a mesma existe evitando repetição de código 
    */
    const taskToUpdate: Task = await this.findOne(id);

    taskToUpdate.title = updateTaskDto.title;
    taskToUpdate.description = updateTaskDto.description;
    taskToUpdate.done = updateTaskDto.done;

    await this.taskRepository.save(taskToUpdate);
    return this.findOne(taskToUpdate.id);
  }

  async remove(id: number) {
    const taskToDelete: Task = await this.findOne(id);
    const isDeleted: any = this.taskRepository.delete(taskToDelete.id);

    // Verificando se não houve nenhum erro ao deletar a Task
    if (!isDeleted) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error!',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Task deleted',
    };
  }
}
