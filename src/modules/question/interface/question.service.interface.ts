import { CreateQuestionDto } from '../dtos/create-question.dto';
import { Question } from '../entity/question.entity';

export interface QuestionServiceInterface {
  create(questionDto: CreateQuestionDto): Promise<Question>;
}
