import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from '../entity/exam.entity';
import { ExamRepository } from 'src/repositories/exam.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Exam]), Exam],
  controllers: [ExamController],
  providers: [
    {
      provide: 'ExamRepositoryInterface',
      useClass: ExamRepository,
    },
    {
      provide: 'ExamServiceInterface',
      useClass: ExamService,
    },
  ],
  exports: [Exam],
})
export class ExamModule {}
