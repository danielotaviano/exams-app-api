import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { OptionRepositoryInterface } from '../option/interface/option.repository.interface';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { DeleteQuestionDto } from './dtos/delete-question.dto';
import { FindOneQuestionDto } from './dtos/find-one-question.dto';
import { ListQuestionDto } from './dtos/list-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
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
    @Inject('OptionRepositoryInterface')
    private readonly optionRepository: OptionRepositoryInterface,
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

  public async findOne(questionDto: FindOneQuestionDto): Promise<Question> {
    return await this.questionsRepository.findById(questionDto.id);
  }

  public async delete(questionDto: DeleteQuestionDto): Promise<void> {
    const result = await this.questionsRepository.remove(questionDto.id);

    if (result.affected === 0)
      throw new HttpException('the question with this id does not exist', 400);
  }

  public async update(
    id: string,
    questionDto: UpdateQuestionDto,
  ): Promise<void> {
    const { options, ...question } = questionDto;
    const result = await this.questionsRepository.update(
      id,
      question as UpdateQuestionDto,
    );
    if (result.affected === 0)
      throw new HttpException('the question with this id does not exist', 404);

    const operations: Promise<UpdateResult>[] = [];
    options.forEach((option) => {
      operations.push(this.optionRepository.update(option.id, option));
    });
    const operationsResults = await Promise.all(operations);
    console.log(operationsResults);
    operationsResults.forEach((operation) => {
      if (operation.affected === 0)
        throw new HttpException(
          'some option was not found, please check the provided id',
          404,
        );
    });
  }
}
