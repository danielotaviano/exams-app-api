import { ExamModule } from './modules/exam/main/exam.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/config/ormconfig';
import { QuestionModule } from './modules/question/main/question.module';
import { OptionModule } from './modules/option/option.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig()),
    ExamModule,
    QuestionModule,
    OptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
