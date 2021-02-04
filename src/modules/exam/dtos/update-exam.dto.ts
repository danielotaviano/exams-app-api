import { IsIn, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Exam, ExamType } from '../entity/exam.entity';

export class UpdateExamDto extends Exam {
  @IsOptional()
  description: string;

  @IsOptional()
  name: string;

  @IsOptional()
  @IsIn(['ONLINE', 'OFFLINE'])
  type: ExamType;
}

export class UpdateExamIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
