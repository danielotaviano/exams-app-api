import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateExamDto } from './dtos/create-exam.dto';
import { FindOneExamDto } from './dtos/find-one-exam.dto';
import { DeleteExamDto } from './dtos/remove-exam.dto';
import { UpdateExamDto } from './dtos/update-exam.dto';
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

  public async delete(examDto: DeleteExamDto): Promise<DeleteResult> {
    return this.examRepository.remove(examDto.id);
  }

  public async findOne(examDto: FindOneExamDto): Promise<Exam> {
    return this.examRepository.findById(examDto.id);
  }

  public async update(
    id: string,
    examDto: UpdateExamDto,
  ): Promise<UpdateResult> {
    const result = await this.examRepository.update(id, examDto);

    return result;
  }
}
