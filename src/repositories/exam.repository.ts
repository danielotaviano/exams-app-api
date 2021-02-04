import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from 'src/modules/exam/entity/exam.entity';
import { ExamRepositoryInterface } from 'src/modules/exam/interface/exam.repository.interface';
import { Repository } from 'typeorm';
import { AbstractRepository } from './base/abstract';

export class ExamRepository
  extends AbstractRepository<Exam>
  implements ExamRepositoryInterface {
  constructor(
    @InjectRepository(Exam)
    private readonly examsRepository: Repository<Exam>,
  ) {
    super(examsRepository);
  }
}
