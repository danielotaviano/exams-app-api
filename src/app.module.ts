import { ExamModule } from './modules/exam/exam.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/config/ormconfig';
import { QuestionModule } from './modules/question/question.module';

@Module({
  imports: [
    ExamModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig()),
    ExamModule,
    QuestionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
