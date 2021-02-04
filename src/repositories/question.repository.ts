import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/modules/question/entity/question.entity';
import { QuestionRepositoryInterface } from 'src/modules/question/interface/question.repository.interface';
import { Repository } from 'typeorm';
import { AbstractRepository } from './base/abstract';

export class QuestionRepository
  extends AbstractRepository<Question>
  implements QuestionRepositoryInterface {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {
    super(questionRepository);
  }
}
