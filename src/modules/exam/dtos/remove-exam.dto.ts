import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteExamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
