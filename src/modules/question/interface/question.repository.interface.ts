import { InterfaceRepository } from 'src/repositories/base/interface';
import { Question } from '../entity/question.entity';

export interface QuestionRepositoryInterface
  extends InterfaceRepository<Question> {
  findByExamId(examId: string): Promise<Question[]>;
}
