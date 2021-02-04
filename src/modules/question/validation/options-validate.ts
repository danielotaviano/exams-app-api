import { CreateQuestionOptionsDto } from '../dtos/create-question.dto';
import { OptionsValidateInterface } from '../interface/options-validate.interface';

export class OptionsValidate implements OptionsValidateInterface {
  validate(options: CreateQuestionOptionsDto[]): boolean {
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
}
