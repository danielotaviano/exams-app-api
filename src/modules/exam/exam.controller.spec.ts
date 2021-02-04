import { Exam, ExamType } from './entity/exam.entity';
import { ExamController } from './exam.controller';
import { ExamServiceInterface } from './interface/exam.service.interface';
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

const makeExamService = (): ExamServiceInterface => {
  class ExamServiceStub implements ExamServiceInterface {
    public async list(): Promise<Exam[]> {
      return Promise.resolve(makeFakeExams());
    }
    public async create(): Promise<Exam> {
      return Promise.resolve(makeFakeExam());
    }
    public async findOne(): Promise<Exam> {
      return Promise.resolve(makeFakeExam());
    }
    public async delete(): Promise<void> {
      return Promise.resolve();
    }
    public async update(): Promise<void> {
      return Promise.resolve();
    }
  }
  return new ExamServiceStub();
};

type SutTypes = {
  sut: ExamController;
  examServiceStub: ExamServiceInterface;
};

const makeSut = (): SutTypes => {
  const examServiceStub = makeExamService();
  const sut = new ExamController(examServiceStub);
  return {
    sut,
    examServiceStub,
  };
};

describe('Exam Controller List', () => {
  test('should call list on service', async () => {
    const { sut, examServiceStub } = makeSut();

    const listSpy = jest.spyOn(examServiceStub, 'list');

    await sut.list();

    expect(listSpy).toHaveBeenCalled();
  });
  test('should return a list of exams on success', async () => {
    const { sut } = makeSut();

    const exams = await sut.list();

    expect(exams).toEqual(makeFakeExams());
  });
});

describe('Exam Controller Create', () => {
  test('should call create on service with correct values', async () => {
    const { sut, examServiceStub } = makeSut();

    const createSpy = jest.spyOn(examServiceStub, 'create');
    const createExamDto = {
      name: 'any_name',
      description: 'any_description',
      type: 'any_type' as ExamType,
    };

    await sut.create(createExamDto);

    expect(createSpy).toHaveBeenCalledWith(createExamDto);
  });
  test('should return a exam on success', async () => {
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
