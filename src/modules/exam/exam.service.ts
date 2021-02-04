import { Inject, Injectable } from '@nestjs/common';
import { Exam } from './entity/exam.entity';
import { ExamRepositoryInterface } from './interface/exam.repository.interface';
import { ExamServiceInterface } from './interface/exam.service.interface';

@Injectable()
export class ExamService implements ExamServiceInterface {
  constructor(
    @Inject('ExamRepositoryInterface')
    private readonly examRepository: ExamRepositoryInterface,
  ) {}
  public async create(userDto: any): Promise<Exam> {
    const exam = new Exam();
    Object.assign(exam, userDto);
    return this.examRepository.create(exam);
  }
}
