import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { ListQuestionDto } from './dtos/list-question.dto';
import { Question } from './entity/question.entity';
import { QuestionServiceInterface } from './interface/question.service.interface';

@Controller('questions')
export class QuestionController {
  constructor(
    @Inject('QuestionServiceInterface')
    private readonly questionService: QuestionServiceInterface,
  ) {}

  @Post()
  public async create(
    @Body() questionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionService.create(questionDto);
  }

  @Get()
  public async list(@Body() questionDto: ListQuestionDto): Promise<Question[]> {
    return await this.questionService.list(questionDto);
  }
}
