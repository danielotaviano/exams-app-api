import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { Question } from './entity/question.entity';
import { OptionsValidateInterface } from './interface/options-validate.interface';
import { QuestionRepositoryInterface } from './interface/question.repository.interface';
import { QuestionServiceInterface } from './interface/question.service.interface';

@Injectable()
export class QuestionService implements QuestionServiceInterface {
  constructor(
    @Inject('QuestionRepositoryInterface')
    private readonly questionsRepository: QuestionRepositoryInterface,
    @Inject('OptionsValidateInterface')
    private readonly optionsValidate: OptionsValidateInterface,
  ) {}
  public async create(questionDto: CreateQuestionDto): Promise<Question> {
    const isValidOptions = this.optionsValidate.validate(questionDto.options);
    if (!isValidOptions)
      throw new HttpException('must be have at least 1 correct option', 400);

    return await this.questionsRepository.create(questionDto);
  }
}
