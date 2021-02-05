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

  describe('Question Controller create', () => {
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
    test('should return a questio on succeds', async () => {
      const { sut } = makeSut();

      const createQuestionDto = {
        examId: 'any_exam_id',
        statement: 'any_statemtn',
        options: [],
      };
      const response = await sut.create(createQuestionDto);

      expect(response).toEqual(makeFakeQuestion());
    });
  });

  describe('Question Controller list', () => {
    test('should call list on service with correct values', async () => {
      const { sut, questionServiceStub } = makeSut();

      const listSpy = jest.spyOn(questionServiceStub, 'list');

      const listQuestionDto = {
        examId: 'any_id',
      };
      await sut.list(listQuestionDto);

      expect(listSpy).toHaveBeenCalledWith(listQuestionDto);
    });
    test('should return a list of questions on success', async () => {
      const { sut } = makeSut();

      const listQuestionDto = {
        examId: 'any_id',
      };
      const questions = await sut.list(listQuestionDto);

      expect(questions).toEqual(makeFakeQuestions());
    });
  });

  describe('Question Controller findOne', () => {
    test('should call findOne on service with correct values', async () => {
      const { sut, questionServiceStub } = makeSut();

      const findOneSpy = jest.spyOn(questionServiceStub, 'findOne');

      const findOneQuestionDto = {
        id: 'any_id',
      };
      await sut.findOne(findOneQuestionDto);

      expect(findOneSpy).toHaveBeenCalledWith(findOneQuestionDto);
    });

    test('should return a question on success', async () => {
      const { sut } = makeSut();

      const findOneQuestionDto = {
        id: 'any_id',
      };
      const exam = await sut.findOne(findOneQuestionDto);

      expect(exam).toEqual(makeFakeQuestion());
    });
  });

  describe('Question Controller delete', () => {
    test('should call delete on service with correct values', async () => {
      const { sut, questionServiceStub } = makeSut();

      const deleteSpy = jest.spyOn(questionServiceStub, 'delete');

      const deleteQuestionDto = {
        id: 'any_id',
      };
      await sut.delete(deleteQuestionDto);

      expect(deleteSpy).toHaveBeenCalledWith(deleteQuestionDto);
    });
    test('should not return on success', async () => {
      const { sut } = makeSut();

      const deleteQuestionDto = {
        id: 'any_id',
      };
      const response = await sut.delete(deleteQuestionDto);

      expect(response).toBeFalsy();
    });
  });
});
