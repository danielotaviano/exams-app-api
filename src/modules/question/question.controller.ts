import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { DeleteQuestionDto } from './dtos/delete-question.dto';
import { FindOneQuestionDto } from './dtos/find-one-question.dto';
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

  @Get(':id')
  public async findOne(
    @Param() questionDto: FindOneQuestionDto,
  ): Promise<Question> {
    return await this.questionService.findOne(questionDto);
  }

  @HttpCode(204)
  @Delete(':id')
  public async delete(@Param() questionDto: DeleteQuestionDto) {
    await this.questionService.delete(questionDto);
  }
}
