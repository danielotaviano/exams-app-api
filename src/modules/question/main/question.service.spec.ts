import MockDate from 'mockdate';
import { DeleteResult, UpdateResult } from 'typeorm';
import { QuestionService } from './question.service';
import { QuestionRepositoryInterface } from '../interface/question.repository.interface';
import { OptionRepositoryInterface } from 'src/modules/option/interface/option.repository.interface';
import { OptionsValidateInterface } from '../interface/options-validate.interface';
import { Question } from '../entity/question.entity';
import { Option } from 'src/modules/option/entity/option.entity';

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

const makeFakeOption = (): Option =>
  Object.assign(new Option(), {
    value: 'any_value',
    correct: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

const makeFakeOptions = (): Option[] => {
  return [
    Object.assign(new Option(), {
      value: 'any_value',
      correct: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    Object.assign(new Option(), {
      value: 'any_value',
      correct: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];
};

const makeQuestionRepository = (): QuestionRepositoryInterface => {
  class QuestionRepositoryStub implements QuestionRepositoryInterface {
    async create(): Promise<Question> {
      return Promise.resolve(makeFakeQuestion());
    }

    async findAll(): Promise<Question[]> {
      return Promise.resolve(makeFakeQuestions());
    }

    async findById(): Promise<Question> {
      return Promise.resolve(makeFakeQuestion());
    }

    async remove(): Promise<DeleteResult> {
      const deleteResult: DeleteResult = { raw: [], affected: 1 };
      return Promise.resolve(deleteResult);
    }

    async update(): Promise<UpdateResult> {
      const updateResult: UpdateResult = {
        generatedMaps: [],
        affected: 1,
        raw: [],
      };
      return Promise.resolve(updateResult);
    }
    async findByExamId(): Promise<Question[]> {
      return Promise.resolve(makeFakeQuestions());
    }
  }
  return new QuestionRepositoryStub();
};

const makeOptionsValidate = (): OptionsValidateInterface => {
  class OptionsValidateStub implements OptionsValidateInterface {
    public validadeEqualValues(): boolean {
      return true;
    }
    public validateCorrectOptions(): boolean {
      return true;
    }
  }
  return new OptionsValidateStub();
};

const makeOptionRepository = (): OptionRepositoryInterface => {
  class OptionRepositoryStub implements OptionRepositoryInterface {
    async create(): Promise<Option> {
      return Promise.resolve(makeFakeOption());
    }

    async findAll(): Promise<Option[]> {
      return Promise.resolve(makeFakeOptions());
    }

    async findById(): Promise<Option> {
      return Promise.resolve(makeFakeOption());
    }

    async remove(): Promise<DeleteResult> {
      const deleteResult: DeleteResult = { raw: [], affected: 1 };
      return Promise.resolve(deleteResult);
    }

    async update(): Promise<UpdateResult> {
      const updateResult: UpdateResult = {
        generatedMaps: [],
        affected: 1,
        raw: [],
      };
      return Promise.resolve(updateResult);
    }
  }
  return new OptionRepositoryStub();
};

type SutTypes = {
  sut: QuestionService;
  questionRepositoryStub: QuestionRepositoryInterface;
  optionRepositoryStub: OptionRepositoryInterface;
  optionsValidateStub: OptionsValidateInterface;
};

const makeSut = (): SutTypes => {
  const questionRepositoryStub = makeQuestionRepository();
  const optionsValidateStub = makeOptionsValidate();
  const optionRepositoryStub = makeOptionRepository();
  const sut = new QuestionService(
    questionRepositoryStub,
    optionsValidateStub,
    optionRepositoryStub,
  );
  return {
    sut,
    questionRepositoryStub,
    optionRepositoryStub,
    optionsValidateStub,
  };
};

describe('Question Service', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  describe('Question Service create', () => {
    test('should calls create method in repository with correct values', async () => {
      const { sut, questionRepositoryStub } = makeSut();

      const createSpy = jest.spyOn(questionRepositoryStub, 'create');

      const createQuestionDto = {
        examId: 'any_exam_id1',
        options: [],
        statement: 'any_statement',
      };
      await sut.create(createQuestionDto);

      expect(createSpy).toBeCalledWith(createQuestionDto);
    });
    test('should return an question on success', async () => {
      const { sut } = makeSut();

      const createQuestionDto = {
        examId: 'any_exam_id1',
        options: [],
        statement: 'any_statement',
      };
      const exam = await sut.create(createQuestionDto);

      expect(exam).toEqual(makeFakeQuestion());
    });
  });

  describe('Question Service list', () => {
    test('should calls findByExamId method in repository', async () => {
      const { sut, questionRepositoryStub } = makeSut();

      const findByExamIdSpy = jest.spyOn(
        questionRepositoryStub,
        'findByExamId',
      );

      const listQuestionDto = {
        examId: 'any_id',
      };
      await sut.list(listQuestionDto);

      expect(findByExamIdSpy).toBeCalledWith('any_id');
    });
    test('should return a questions on success', async () => {
      const { sut } = makeSut();

      const listQuestionDto = {
        examId: 'any_id',
      };
      const response = await sut.list(listQuestionDto);

      expect(response).toEqual(makeFakeQuestions());
    });
  });
});
