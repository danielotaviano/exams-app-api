import { CreateQuestionDto } from '../dtos/create-question.dto';
import { ListQuestionDto } from '../dtos/list-question.dto';
import { Question } from '../entity/question.entity';

export interface QuestionServiceInterface {
  create(questionDto: CreateQuestionDto): Promise<Question>;
  list(questionDto: ListQuestionDto): Promise<Question[]>;
}
