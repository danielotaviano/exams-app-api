import { Body, Controller, Post } from '@nestjs/common';
import { Exam } from './entity/exam.entity';
import { ExamService } from './exam.service';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  public async create(@Body() examDto: any): Promise<Exam> {
    return await this.examService.create(examDto);
  }
}
