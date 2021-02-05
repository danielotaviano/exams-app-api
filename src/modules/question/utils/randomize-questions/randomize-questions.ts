import { Option } from 'src/modules/option/entity/option.entity';
import { Question } from '../../entity/question.entity';
import { RandomizeQuestionsInterface } from '../../interface/randomize-questions.interface';
import { shuffleArray } from '../shuffle-array/shuffle-array';

export class RandomizeQuestions implements RandomizeQuestionsInterface {
  public randomize(questions: Question[]): Question[] {
    const shuffledQuestions = this.randomizeQuestions(questions);

    const shuffledQuestionsWithShuffledOptionsWithKeys = shuffledQuestions.map(
      (question) => {
        question.options = this.randomizeOptions(question.options);
        this.setKeys(question.options);
        return question;
      },
    );

    return shuffledQuestionsWithShuffledOptionsWithKeys;
  }

  private randomizeOptions(options: Option[]): Option[] {
    const shuffledOptions = shuffleArray(options);

    return shuffledOptions;
  }

  private setKeys(options: Option[]): void {
    options.reduce((code, crr) => {
      crr.key = String.fromCharCode(code);
      return code + 1;
    }, 97);
  }

  private randomizeQuestions(questions: Question[]): Question[] {
    const shuffledQuestions = shuffleArray(questions);

    return shuffledQuestions;
  }
}
