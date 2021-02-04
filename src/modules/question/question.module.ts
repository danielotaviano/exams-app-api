import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from 'src/repositories/question.repository';
import { Question } from './entity/question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { OptionsValidate } from './validation/options-validate';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [
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
