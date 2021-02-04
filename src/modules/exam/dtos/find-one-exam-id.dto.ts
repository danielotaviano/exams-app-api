import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneExamIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
