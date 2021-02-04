import { IsNotEmpty, IsUUID } from 'class-validator';

export class ListQuestionDto {
  @IsNotEmpty()
  @IsUUID()
  examId: string;
}
