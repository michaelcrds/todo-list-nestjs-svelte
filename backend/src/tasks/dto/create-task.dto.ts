import { IsNotEmpty } from 'class-validator';

/* 
  DTO - Data transfer object 
  Essa classe representa o objeto que vai ser trafegado para criar uma nova Task
*/
export class CreateTaskDto {
  // Validando os campos necessários para criar uma Task
  @IsNotEmpty()
  title: string;
  description: string;
  done: boolean;
}
