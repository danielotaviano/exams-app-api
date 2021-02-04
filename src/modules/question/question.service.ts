import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { Question } from './entity/question.entity';
import { QuestionRepositoryInterface } from './interface/question.repository.interface';
import { QuestionServiceInterface } from './interface/question.service.interface';

@Injectable()
export class QuestionService implements QuestionServiceInterface {
  constructor(
    @Inject('QuestionRepositoryInterface')
    private readonly questionsRepository: QuestionRepositoryInterface,
  ) {}
  public async create(questionDto: CreateQuestionDto): Promise<Question> {
    return await this.questionsRepository.create(questionDto);
  }
}
