import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dtos/create-question.dto';
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
}
