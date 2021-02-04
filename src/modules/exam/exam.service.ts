import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entity/user.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) {}
  public async create(userDto: any): Promise<Exam> {
    const exam = new Exam();
    Object.assign(exam, userDto);
    return this.examRepository.save(exam);
  }
}
