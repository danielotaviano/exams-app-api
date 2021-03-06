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
  Put,
} from '@nestjs/common';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { FindOneExamIdDto } from '../dtos/find-one-exam-id.dto';
import { DeleteExamIdDto } from '../dtos/remove-exam-id.dto';
import { UpdateExamDto, UpdateExamIdDto } from '../dtos/update-exam.dto';
import { Exam } from '../entity/exam.entity';
import { ExamServiceInterface } from '../interface/exam.service.interface';

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
  public async findOne(@Param() examDIdto: FindOneExamIdDto): Promise<Exam> {
    const exam = await this.examService.findOne(examDIdto);

    return exam;
  }

  @Post()
  public async create(@Body() examDto: CreateExamDto): Promise<Exam> {
    return await this.examService.create(examDto);
  }

  @HttpCode(204)
  @Delete(':id')
  public async delete(@Param() examIdDto: DeleteExamIdDto): Promise<void> {
    await this.examService.delete(examIdDto);
  }

  @HttpCode(204)
  @Put(':id')
  public async update(
    @Param() examIdDto: UpdateExamIdDto,
    @Body() examDto: UpdateExamDto,
  ) {
    await this.examService.update(examIdDto, examDto);
  }
}
