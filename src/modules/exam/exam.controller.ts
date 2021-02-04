import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateExamDto } from './dtos/create-exam.dto';
import { Exam } from './entity/exam.entity';
import { ExamServiceInterface } from './interface/exam.service.interface';

@Controller('exams')
export class ExamController {
  constructor(
    @Inject('ExamServiceInterface')
    private readonly examService: ExamServiceInterface,
  ) {}

  @Get()
  public async list(): Promise<Exam[]> {
    return await this.examService.list();
  }

  @Post()
  public async create(@Body() examDto: CreateExamDto): Promise<Exam> {
    return await this.examService.create(examDto);
  }
}
