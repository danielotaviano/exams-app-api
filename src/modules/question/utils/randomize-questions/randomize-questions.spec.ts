import { mockRandom } from 'jest-mock-random';
import { Question } from '../../entity/question.entity';
import { Option } from '../../../option/entity/option.entity';
import { RandomizeQuestions } from './randomize-questions';
import MockDate from 'mockdate';

const makeFakeQuestions = (): Question[] => {
  return [
    Object.assign(new Question(), {
      id: 'any_id',
      examId: 'any_exam_id',
      options: makeFakeOptions(),
      statement: 'any_statement',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    Object.assign(new Question(), {
      id: 'other_id',
      examId: 'other_exam_id',
      options: makeFakeOptions(),
      statement: 'other_statement',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];
};

const makeFakeOptions = (): Option[] => {
  return [
    Object.assign(new Option(), {
      id: 'any_id',
      value: 'any_value',
      correct: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    Object.assign(new Option(), {
      id: 'other_id',
      value: 'any_value',
      correct: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];
};

const makeFakeOptionsWithKeys = (): Option[] => {
  return [
    Object.assign(new Option(), {
      id: 'any_id',
      value: 'any_value',
      correct: true,
      key: 'a',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    Object.assign(new Option(), {
      id: 'other_id',
      value: 'any_value',
      correct: true,
      key: 'b',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];
};

const makeFakeQuestionsWithKeys = (): Question[] => {
  return [
    Object.assign(new Question(), {
      id: 'any_id',
      examId: 'any_exam_id',
      options: makeFakeOptionsWithKeys(),
      statement: 'any_statement',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    Object.assign(new Question(), {
      id: 'other_id',
      examId: 'other_exam_id',
      options: makeFakeOptionsWithKeys(),
      statement: 'other_statement',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];
};

describe('Randomize Questions', () => {
  mockRandom(0.99);

  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  test('should return a list of questions in random order with options in random order', () => {
    const sut = new RandomizeQuestions();
    expect(sut.randomize(makeFakeQuestions())).toEqual(
      makeFakeQuestionsWithKeys(),
    );
  });
});
