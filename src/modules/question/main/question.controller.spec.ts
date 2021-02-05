import MockDate from 'mockdate';
import { Question } from '../entity/question.entity';
import { QuestionServiceInterface } from '../interface/question.service.interface';
import { QuestionController } from './question.controller';

const makeFakeQuestion = (): Question =>
  Object.assign(new Question(), {
    id: 'any_id',
    examId: 'any_exam_id',
    options: [],
    statement: 'any_statement',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

const makeFakeQuestions = (): Question[] => {
  return [
    Object.assign(new Question(), {
      id: 'any_id',
      examId: 'any_exam_id',
      options: [],
      statement: 'any_statement',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    Object.assign(new Question(), {
      id: 'other_id',
      examId: 'other_exam_id',
      options: [],
      statement: 'other_statement',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];
};

const makeQuestionService = (): QuestionServiceInterface => {
  class QuestionServiceStub implements QuestionServiceInterface {
    public async list(): Promise<Question[]> {
      return Promise.resolve(makeFakeQuestions());
    }
    public async create(): Promise<Question> {
      return Promise.resolve(makeFakeQuestion());
    }
    public async findOne(): Promise<Question> {
      return Promise.resolve(makeFakeQuestion());
    }
    public async delete(): Promise<void> {
      return Promise.resolve();
    }
    public async update(): Promise<void> {
      return Promise.resolve();
    }
  }
  return new QuestionServiceStub();
};

type SutTypes = {
  sut: QuestionController;
  questionServiceStub: QuestionServiceInterface;
};

const makeSut = (): SutTypes => {
  const questionServiceStub = makeQuestionService();
  const sut = new QuestionController(questionServiceStub);
  return {
    sut,
    questionServiceStub,
  };
};

describe('Exam Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  describe('Exam Controller create', () => {
    test('should call create method in service with correct values', async () => {
      const { sut, questionServiceStub } = makeSut();

      const createSpy = jest.spyOn(questionServiceStub, 'create');

      const createQuestionDto = {
        examId: 'any_exam_id',
        statement: 'any_statemtn',
        options: [],
      };
      await sut.create(createQuestionDto);

      expect(createSpy).toBeCalledWith(createQuestionDto);
    });
  });
});
