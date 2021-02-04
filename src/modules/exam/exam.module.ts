import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entity/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
