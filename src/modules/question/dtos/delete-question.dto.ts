import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteQuestionDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
