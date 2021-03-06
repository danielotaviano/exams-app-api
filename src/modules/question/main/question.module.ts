import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionRepository } from 'src/repositories/option.repository';
import { QuestionRepository } from 'src/repositories/question.repository';
import { Option } from '../../option/entity/option.entity';
import { Question } from '../entity/question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { OptionsValidate } from '../validation/options-validate';
import { ExamRepository } from 'src/repositories/exam.repository';
import { Exam } from 'src/modules/exam/entity/exam.entity';
import { RandomizeQuestions } from '../utils/randomize-questions/randomize-questions';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Option, Exam])],
  controllers: [QuestionController],
  providers: [
    { provide: 'RandomizeQuestionsInterface', useClass: RandomizeQuestions },
    {
      provide: 'ExamRepositoryInterface',
      useClass: ExamRepository,
    },
    {
      provide: 'OptionRepositoryInterface',
      useClass: OptionRepository,
    },
    {
      provide: 'QuestionServiceInterface',
      useClass: QuestionService,
    },
    {
      provide: 'QuestionRepositoryInterface',
      useClass: QuestionRepository,
    },
    {
      provide: 'OptionsValidateInterface',
      useClass: OptionsValidate,
    },
  ],
})
export class QuestionModule {}
