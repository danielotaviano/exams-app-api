import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneQuestionDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
