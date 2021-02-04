import { CreateQuestionOptionsDto } from '../dtos/create-question.dto';

export interface OptionsValidateInterface {
  validate(options: CreateQuestionOptionsDto[]): boolean;
}
