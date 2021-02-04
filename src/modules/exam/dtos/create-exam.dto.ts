import { IsIn, IsNotEmpty } from 'class-validator';
import { ExamType } from '../entity/exam.entity';

export class CreateExamDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsIn(['ONLINE', 'OFFLINE'])
  type: ExamType;
}
