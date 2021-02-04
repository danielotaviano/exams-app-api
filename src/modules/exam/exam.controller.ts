import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CreateExamDto } from './dtos/create-exam.dto';
import { FindOneExamDto } from './dtos/find-one-exam.dto';
import { DeleteExamDto } from './dtos/remove-exam.dto';
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

  @Get(':id')
  public async findOne(@Param() examDto: FindOneExamDto): Promise<Exam> {
    const exam = await this.examService.findOne(examDto);
    if (!exam)
      throw new HttpException('the exam with this id does not exist', 404);

    return exam;
  }

  @Post()
  public async create(@Body() examDto: CreateExamDto): Promise<Exam> {
    return await this.examService.create(examDto);
  }

  @HttpCode(204)
  @Delete(':id')
  public async delete(@Param() examDto: DeleteExamDto): Promise<void> {
    const result = await this.examService.delete(examDto);
    if (result.affected === 0)
      throw new HttpException('the exam with this id does not exist', 404);
  }
}
