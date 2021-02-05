import { Question } from '../entity/question.entity';

export interface RandomizeQuestionsInterface {
  randomize(questions: Question[]): Question[];
}
