import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateExamDto } from './dtos/create-exam.dto';
import { FindOneExamIdDto } from './dtos/find-one-exam-id.dto';
import { DeleteExamIdDto } from './dtos/remove-exam-id.dto';
import { UpdateExamDto, UpdateExamIdDto } from './dtos/update-exam.dto';
import { Exam } from './entity/exam.entity';
import { ExamRepositoryInterface } from './interface/exam.repository.interface';
import { ExamServiceInterface } from './interface/exam.service.interface';

@Injectable()
export class ExamService implements ExamServiceInterface {
  constructor(
    @Inject('ExamRepositoryInterface')
    private readonly examRepository: ExamRepositoryInterface,
  ) {}
  public async create(examDto: CreateExamDto): Promise<Exam> {
    const exam = new Exam();
    Object.assign(exam, examDto);
    return this.examRepository.create(exam);
  }

  public async list(): Promise<Exam[]> {
    return this.examRepository.findAll();
  }

  public async delete(examDto: DeleteExamIdDto): Promise<DeleteResult> {
    return this.examRepository.remove(examDto.id);
  }

  public async findOne(examDto: FindOneExamIdDto): Promise<Exam> {
    return this.examRepository.findById(examDto.id);
  }

  public async update(
    examIdDto: UpdateExamIdDto,
    examDto: UpdateExamDto,
  ): Promise<UpdateResult> {
    return await this.examRepository.update(examIdDto.id, examDto);
  }
}
