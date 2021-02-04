import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { FindOneExamIdDto } from '../dtos/find-one-exam-id.dto';
import { DeleteExamIdDto } from '../dtos/remove-exam-id.dto';
import { UpdateExamDto, UpdateExamIdDto } from '../dtos/update-exam.dto';
import { Exam } from '../entity/exam.entity';

export interface ExamServiceInterface {
  create(examDto: CreateExamDto): Promise<Exam>;
  list(): Promise<Exam[]>;
  delete(examDto: DeleteExamIdDto): Promise<DeleteResult>;
  findOne(examDto: FindOneExamIdDto): Promise<Exam>;
  update(id: UpdateExamIdDto, examDto: UpdateExamDto): Promise<UpdateResult>;
}
