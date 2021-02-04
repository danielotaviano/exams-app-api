import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneExamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
