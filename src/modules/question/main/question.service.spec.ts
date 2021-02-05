import MockDate from 'mockdate';
import { DeleteResult, UpdateResult } from 'typeorm';
import { QuestionService } from './question.service';
import { QuestionRepositoryInterface } from '../interface/question.repository.interface';
import { OptionRepositoryInterface } from 'src/modules/option/interface/option.repository.interface';
import { OptionsValidateInterface } from '../interface/options-validate.interface';
import { Question } from '../entity/question.entity';
import { Option } from 'src/modules/option/entity/option.entity';
import { HttpException } from '@nestjs/common';
import { ExamRepositoryInterface } from 'src/modules/exam/interface/exam.repository.interface';
import { Exam } from 'src/modules/exam/entity/exam.entity';

const makeFakeQuestion = (): Question =>
  Object.assign(new Question(), {
    id: 'any_id',
    examId: 'any_exam_id',
    options: makeFakeOptions(),
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

const makeFakeQuestionWithoutOptions = (): Question =>
  Object.assign(new Question(), {
    id: 'any_id',
    examId: 'any_exam_id',
    statement: 'any_statement',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
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

const makeFakeExam = (): Exam => ({
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  type: 'OFFLINE',
  questions: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});

const makeFakeExams = (): Exam[] => {
  return [
    {
      id: 'any_id',
      name: 'any_name',
      description: 'any_description',
      type: 'OFFLINE',
      questions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'any_other_id',
      name: 'any_other_name',
      description: 'any_other_description',
      type: 'OFFLINE',
      questions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
};

const makeOptionsValidate = (): OptionsValidateInterface => {
  class OptionsValidateStub implements OptionsValidateInterface {
    public validateEqualValues(): boolean {
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

const makeExamRepository = (): ExamRepositoryInterface => {
  class ExamRepositoryStub implements ExamRepositoryInterface {
    async create(): Promise<Exam> {
      return Promise.resolve(makeFakeExam());
    }

    async findAll(): Promise<Exam[]> {
      return Promise.resolve(makeFakeExams());
    }

    async findById(): Promise<Exam> {
      return Promise.resolve(makeFakeExam());
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
  return new ExamRepositoryStub();
};

type SutTypes = {
  sut: QuestionService;
  questionRepositoryStub: QuestionRepositoryInterface;
  optionRepositoryStub: OptionRepositoryInterface;
  optionsValidateStub: OptionsValidateInterface;
  examRepositoryStub: ExamRepositoryInterface;
};

const makeSut = (): SutTypes => {
  const questionRepositoryStub = makeQuestionRepository();
  const optionsValidateStub = makeOptionsValidate();
  const optionRepositoryStub = makeOptionRepository();
  const examRepositoryStub = makeExamRepository();
  const sut = new QuestionService(
    questionRepositoryStub,
    optionsValidateStub,
    optionRepositoryStub,
    examRepositoryStub,
  );
  return {
    sut,
    questionRepositoryStub,
    optionRepositoryStub,
    optionsValidateStub,
    examRepositoryStub,
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
    test('should throw if validateCorrectsOptions return false', async () => {
      const { sut, optionsValidateStub } = makeSut();

      jest
        .spyOn(optionsValidateStub, 'validateCorrectOptions')
        .mockReturnValueOnce(false);

      const createQuestionDto = {
        examId: 'any_exam_id1',
        options: [],
        statement: 'any_statement',
      };
      const promise = sut.create(createQuestionDto);

      await expect(promise).rejects.toThrow(
        new HttpException('must be have at least 1 correct option', 400),
      );
    });
    test('should throw if findById method of exam repository return null', async () => {
      const { sut, examRepositoryStub } = makeSut();

      jest.spyOn(examRepositoryStub, 'findById').mockReturnValueOnce(null);

      const createQuestionDto = {
        examId: 'any_exam_id',
        options: [],
        statement: 'any_statement',
      };
      const promise = sut.create(createQuestionDto);

      await expect(promise).rejects.toThrow(
        new HttpException('There is no exam with the given id', 400),
      );
    });
    test('should throw if validateEqualValues return false', async () => {
      const { sut, optionsValidateStub } = makeSut();

      jest
        .spyOn(optionsValidateStub, 'validateEqualValues')
        .mockReturnValueOnce(false);

      const createQuestionDto = {
        examId: 'any_exam_id1',
        options: [],
        statement: 'any_statement',
      };
      const promise = sut.create(createQuestionDto);

      await expect(promise).rejects.toThrow(
        new HttpException('options value cannot be equal', 400),
      );
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

  describe('Question Service delete', () => {
    test('should calls remove method in repository with correct value', async () => {
      const { sut, questionRepositoryStub } = makeSut();

      const removeSpy = jest.spyOn(questionRepositoryStub, 'remove');

      const deleteQuestionDto = {
        id: 'any_id',
      };
      await sut.delete(deleteQuestionDto);

      expect(removeSpy).toBeCalledWith('any_id');
    });
    test('should throws an HttpException if result.affected is 0', async () => {
      const { sut, questionRepositoryStub } = makeSut();

      jest
        .spyOn(questionRepositoryStub, 'remove')
        .mockReturnValueOnce(Promise.resolve({ raw: [], affected: 0 }));

      const deleteQuestionDto = {
        id: 'any_id',
      };
      const promise = sut.delete(deleteQuestionDto);

      await expect(promise).rejects.toThrow(
        new HttpException('the question with this id does not exist', 404),
      );
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

  describe('Question Service findOne', () => {
    test('should calls findById method in repository with correct value', async () => {
      const { sut, questionRepositoryStub } = makeSut();

      const findByIdSpy = jest.spyOn(questionRepositoryStub, 'findById');

      const findOneQuestionDto = {
        id: 'any_id',
      };
      await sut.findOne(findOneQuestionDto);

      expect(findByIdSpy).toBeCalledWith('any_id');
    });
    test('should throws a HttpException if findById repository method returns null', async () => {
      const { sut, questionRepositoryStub } = makeSut();

      jest.spyOn(questionRepositoryStub, 'findById').mockReturnValueOnce(null);

      const findOneQuestionDto = {
        id: 'any_id',
      };
      const promise = sut.findOne(findOneQuestionDto);

      await expect(promise).rejects.toThrow(
        new HttpException('the question with this id does not exist', 404),
      );
    });
    test('should returns a question on success', async () => {
      const { sut } = makeSut();

      const findOneExamDto = {
        id: 'any_id',
      };
      const response = await sut.findOne(findOneExamDto);

      expect(response).toEqual(makeFakeQuestion());
    });
  });

  describe('Question Service update', () => {
    test('should calls update method in repository with correct value', async () => {
      const { sut, questionRepositoryStub } = makeSut();

      const updateSpy = jest.spyOn(questionRepositoryStub, 'update');

      await sut.update('any_id', makeFakeQuestion());

      expect(updateSpy).toBeCalledWith(
        'any_id',
        makeFakeQuestionWithoutOptions(),
      );
    });
    test('should calls update method in options repository if has any option to update', async () => {
      const { sut, optionRepositoryStub } = makeSut();

      const updateSpy = jest.spyOn(optionRepositoryStub, 'update');

      await sut.update('any_id', makeFakeQuestion());

      expect(updateSpy).toHaveBeenNthCalledWith(
        1,
        'any_id',
        makeFakeOptions()[0],
      );
      expect(updateSpy).toHaveBeenNthCalledWith(
        2,
        'other_id',
        makeFakeOptions()[1],
      );
    });
    test('should throw if result.affected of any options update is 0', async () => {
      const { sut, optionRepositoryStub } = makeSut();

      jest.spyOn(optionRepositoryStub, 'update').mockReturnValueOnce(
        Promise.resolve({
          generatedMaps: [],
          affected: 0,
          raw: [],
        }),
      );

      const promise = sut.update('any_id', makeFakeQuestion());
      await expect(promise).rejects.toThrow(
        new HttpException(
          'option with id any_id was not found, please check the provided id',
          404,
        ),
      );
    });
    test('should throws a HttpException if result.affected is 0', async () => {
      const { sut, questionRepositoryStub } = makeSut();

      jest
        .spyOn(questionRepositoryStub, 'update')
        .mockReturnValueOnce(
          Promise.resolve({ raw: [], affected: 0, generatedMaps: [] }),
        );

      const promise = sut.update('any_id', makeFakeQuestion());

      await expect(promise).rejects.toThrow(
        new HttpException('the question with this id does not exist', 404),
      );
    });

    test('should not return on success', async () => {
      const { sut } = makeSut();

      const response = await sut.update('any_id', makeFakeQuestion());

      expect(response).toBeFalsy();
    });
  });
});
