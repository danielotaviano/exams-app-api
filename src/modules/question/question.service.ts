import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { ListQuestionDto } from './dtos/list-question.dto';
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
    const isValidOptions = this.optionsValidate.validateCorrectOptions(
      questionDto.options,
    );
    if (!isValidOptions)
      throw new HttpException('must be have at least 1 correct option', 400);
    const isValidValues = this.optionsValidate.validadeEqualValues(
      questionDto.options,
    );
    if (!isValidValues)
      throw new HttpException('options value cannot be equal', 400);

    return await this.questionsRepository.create(questionDto);
  }

  public async list(questionDto: ListQuestionDto): Promise<Question[]> {
    return await this.questionsRepository.findByExamId(questionDto.examId);
  }
}
