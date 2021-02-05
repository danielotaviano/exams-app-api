import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ExamRepositoryInterface } from 'src/modules/exam/interface/exam.repository.interface';
import { UpdateResult } from 'typeorm';
import { OptionRepositoryInterface } from '../../option/interface/option.repository.interface';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { DeleteQuestionDto } from '../dtos/delete-question.dto';
import { FindOneQuestionDto } from '../dtos/find-one-question.dto';
import { ListQuestionDto } from '../dtos/list-question.dto';
import { UpdateQuestionDto } from '../dtos/update-question.dto';
import { Question } from '../entity/question.entity';
import { OptionsValidateInterface } from '../interface/options-validate.interface';
import { QuestionRepositoryInterface } from '../interface/question.repository.interface';
import { QuestionServiceInterface } from '../interface/question.service.interface';
import { RandomizeQuestionsInterface } from '../interface/randomize-questions.interface';

@Injectable()
export class QuestionService implements QuestionServiceInterface {
  constructor(
    @Inject('QuestionRepositoryInterface')
    private readonly questionsRepository: QuestionRepositoryInterface,
    @Inject('OptionsValidateInterface')
    private readonly optionsValidate: OptionsValidateInterface,
    @Inject('OptionRepositoryInterface')
    private readonly optionRepository: OptionRepositoryInterface,
    @Inject('ExamRepositoryInterface')
    private readonly examRepository: ExamRepositoryInterface,
    @Inject('RandomizeQuestionsInterface')
    private readonly randomizeQuestions: RandomizeQuestionsInterface,
  ) {}

  public async create(questionDto: CreateQuestionDto): Promise<Question> {
    const isValidExam = await this.examRepository.findById(questionDto.examId);
    if (!isValidExam)
      throw new HttpException('There is no exam with the given id', 400);

    const isValidOptions = this.optionsValidate.validateCorrectOptions(
      questionDto.options,
    );
    if (!isValidOptions)
      throw new HttpException('must be have at least 1 correct option', 400);

    const isValidValues = this.optionsValidate.validateEqualValues(
      questionDto.options,
    );
    if (!isValidValues)
      throw new HttpException('options value cannot be equal', 400);

    return await this.questionsRepository.create(questionDto);
  }

  public async list(questionDto: ListQuestionDto): Promise<Question[]> {
    const questions = await this.questionsRepository.findByExamId(
      questionDto.examId,
    );

    const randomizedQuestions = this.randomizeQuestions.randomize(questions);

    return randomizedQuestions;
  }

  public async findOne(questionDto: FindOneQuestionDto): Promise<Question> {
    const question = this.questionsRepository.findById(questionDto.id);

    if (!question)
      throw new HttpException('the question with this id does not exist', 404);

    return question;
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
    operationsResults.forEach((operation, index) => {
      if (operation.affected === 0)
        throw new HttpException(
          `option with id ${options[index].id} was not found, please check the provided id`,
          404,
        );
    });
  }
}
