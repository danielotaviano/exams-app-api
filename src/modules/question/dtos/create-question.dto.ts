import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  statement: string;

  @IsNotEmpty()
  @IsUUID()
  examId: string;
}
