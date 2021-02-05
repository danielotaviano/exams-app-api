import { CreateQuestionOptionsDto } from '../dtos/create-question.dto';

export interface OptionsValidateInterface {
  validateCorrectOptions(options: CreateQuestionOptionsDto[]): boolean;
  validateEqualValues(options: CreateQuestionOptionsDto[]): boolean;
}
