import { Exam, ExamType } from './entity/exam.entity';
import MockDate from 'mockdate';
import { ExamService } from './exam.service';
import { ExamRepositoryInterface } from './interface/exam.repository.interface';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpException } from '@nestjs/common';

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
    test('should return an exams on success', async () => {
      const { sut } = makeSut();

      const response = await sut.list();

      expect(response).toEqual(makeFakeExams());
    });
  });

  describe('Exam Service delete', () => {
    test('should calls remove method in repository with correct value', async () => {
      const { sut, examRepositoryStub } = makeSut();

      const removeSpy = jest.spyOn(examRepositoryStub, 'remove');

      const deleteExamDto = {
        id: 'any_id',
      };
      await sut.delete(deleteExamDto);

      expect(removeSpy).toBeCalledWith('any_id');
    });
    test('should throws an HttpException if result.affected is 0', async () => {
      const { sut, examRepositoryStub } = makeSut();

      jest
        .spyOn(examRepositoryStub, 'remove')
        .mockReturnValueOnce(Promise.resolve({ raw: [], affected: 0 }));

      const deleteExamDto = {
        id: 'any_id',
      };
      const promise = sut.delete(deleteExamDto);

      await expect(promise).rejects.toThrow(
        new HttpException('the exam with this id does not exist', 404),
      );
    });
    test('should not return on success', async () => {
      const { sut } = makeSut();

      const deleteExamDto = {
        id: 'any_id',
      };
      const response = await sut.delete(deleteExamDto);

      expect(response).toBeFalsy();
    });
  });
});
