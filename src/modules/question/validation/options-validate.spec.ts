import { CreateQuestionOptionsDto } from '../dtos/create-question.dto';
import { OptionsValidate } from './options-validate';

describe('OptionsValidate Validation', () => {
  describe('Validate Correct Options', () => {
    test('should returns false if there is no correct option', () => {
      const options: CreateQuestionOptionsDto[] = [
        { correct: false, value: 'any_value' },
        { correct: false, value: 'other_value' },
      ];

      const sut = new OptionsValidate();

      const isValid = sut.validateCorrectOptions(options);

      expect(isValid).toBeFalsy();
    });
    test('should returns true if there is correct option', () => {
      const options: CreateQuestionOptionsDto[] = [
        { correct: true, value: 'any_value' },
        { correct: false, value: 'other_value' },
      ];

      const sut = new OptionsValidate();

      const isValid = sut.validateCorrectOptions(options);

      expect(isValid).toBeTruthy();
    });
  });
  describe('Validate Equal Values', () => {
    test('should returns false if there is option with same value', () => {
      const options: CreateQuestionOptionsDto[] = [
        { correct: true, value: 'any_value' },
        { correct: false, value: 'any_value' },
      ];

      const sut = new OptionsValidate();

      const isValid = sut.validadeEqualValues(options);

      expect(isValid).toBeFalsy();
    });
    test('should returns true if there is no options with same value', () => {
      const options: CreateQuestionOptionsDto[] = [
        { correct: true, value: 'any_value' },
        { correct: false, value: 'other_value' },
      ];

      const sut = new OptionsValidate();

      const isValid = sut.validadeEqualValues(options);

      expect(isValid).toBeTruthy();
    });
  });
});
