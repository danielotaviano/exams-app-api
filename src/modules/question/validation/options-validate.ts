import { CreateQuestionOptionsDto } from '../dtos/create-question.dto';
import { OptionsValidateInterface } from '../interface/options-validate.interface';

export class OptionsValidate implements OptionsValidateInterface {
  validateCorrectOptions(options: CreateQuestionOptionsDto[]): boolean {
    const state = options.reduce(
      (value, crr) => {
        if (crr.correct) return { correctOptions: value.correctOptions + 1 };
        return value;
      },
      { correctOptions: 0 },
    );

    if (state.correctOptions < 1) return false;
    return true;
  }

  validateEqualValues(options: CreateQuestionOptionsDto[]): boolean {
    const state = options.reduce((value, crr) => {
      value[crr.value] ? value[crr.value]++ : (value[crr.value] = 1);
      return value;
    }, {});

    for (const value in state) {
      if (state[value] > 1) return false;
    }
    return true;
  }
}
