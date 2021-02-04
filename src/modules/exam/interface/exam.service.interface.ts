import { CreateExamDto } from '../dtos/create-exam.dto';
import { Exam } from '../entity/exam.entity';

export interface ExamServiceInterface {
  create(examDto: CreateExamDto): Promise<Exam>;
  list(): Promise<Exam[]>;
}
