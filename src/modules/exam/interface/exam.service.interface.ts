import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { FindOneExamDto } from '../dtos/find-one-exam.dto';
import { DeleteExamDto } from '../dtos/remove-exam.dto';
import { UpdateExamDto } from '../dtos/update-exam.dto';
import { Exam } from '../entity/exam.entity';

export interface ExamServiceInterface {
  create(examDto: CreateExamDto): Promise<Exam>;
  list(): Promise<Exam[]>;
  delete(examDto: DeleteExamDto): Promise<DeleteResult>;
  findOne(examDto: FindOneExamDto): Promise<Exam>;
  update(id: string, examDto: UpdateExamDto): Promise<UpdateResult>;
}
