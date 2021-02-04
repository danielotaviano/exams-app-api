import { Exam, ExamType } from './entity/exam.entity';
import MockDate from 'mockdate';
import { ExamService } from './exam.service';
import { ExamRepositoryInterface } from './interface/exam.repository.interface';
import { DeleteResult, UpdateResult } from 'typeorm';

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
  sut: ExamService;
  examRepositoryStub: ExamRepositoryInterface;
};

const makeSut = (): SutTypes => {
  const examRepositoryStub = makeExamRepository();
  const sut = new ExamService(examRepositoryStub);
  return {
    sut,
    examRepositoryStub,
  };
};

describe('Exam Service', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  describe('Exam Service create', () => {
    test('should calls create method in repository with correct values', async () => {
      const { sut, examRepositoryStub } = makeSut();

      const createSpy = jest.spyOn(examRepositoryStub, 'create');

      const createExamDto = {
        name: 'any_name',
        description: 'any_description',
        type: 'any_type' as ExamType,
      };
      await sut.create(createExamDto);

      expect(createSpy).toBeCalledWith(createExamDto);
    });
    test('should return an exam on success', async () => {
      const { sut } = makeSut();

      const createExamDto = {
        name: 'any_name',
        description: 'any_description',
        type: 'any_type' as ExamType,
      };
      const exam = await sut.create(createExamDto);

      expect(exam).toEqual(makeFakeExam());
    });
  });

  describe('Exam Service list', () => {
    test('should calls findAll method in repository', async () => {
      const { sut, examRepositoryStub } = makeSut();

      const listSpy = jest.spyOn(examRepositoryStub, 'findAll');

      await sut.list();

      expect(listSpy).toBeCalled();
    });
  });
});
