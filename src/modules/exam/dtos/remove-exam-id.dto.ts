import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteExamIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
