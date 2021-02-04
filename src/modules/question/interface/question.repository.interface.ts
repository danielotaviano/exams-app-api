import { InterfaceRepository } from 'src/repositories/base/interface';
import { Question } from '../entity/question.entity';

export type QuestionRepositoryInterface = InterfaceRepository<Question>;
