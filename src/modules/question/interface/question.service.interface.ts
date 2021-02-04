import { CreateQuestionDto } from '../dtos/create-question.dto';
import { DeleteQuestionDto } from '../dtos/delete-question.dto';
import { FindOneQuestionDto } from '../dtos/find-one-question.dto';
import { ListQuestionDto } from '../dtos/list-question.dto';
import { UpdateQuestionDto } from '../dtos/update-question.dto';
import { Question } from '../entity/question.entity';

export interface QuestionServiceInterface {
  create(questionDto: CreateQuestionDto): Promise<Question>;
  list(questionDto: ListQuestionDto): Promise<Question[]>;
  findOne(questionDto: FindOneQuestionDto): Promise<Question>;
  delete(questionDto: DeleteQuestionDto): Promise<void>;
  update(id: string, questionDto: UpdateQuestionDto): Promise<void>;
}
