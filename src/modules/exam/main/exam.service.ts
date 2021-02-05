import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { FindOneExamIdDto } from '../dtos/find-one-exam-id.dto';
import { DeleteExamIdDto } from '../dtos/remove-exam-id.dto';
import { UpdateExamDto, UpdateExamIdDto } from '../dtos/update-exam.dto';
import { Exam } from '../entity/exam.entity';
import { ExamRepositoryInterface } from '../interface/exam.repository.interface';
import { ExamServiceInterface } from '../interface/exam.service.interface';

@Injectable()
export class ExamService implements ExamServiceInterface {
  constructor(
    @Inject('ExamRepositoryInterface')
    private readonly examRepository: ExamRepositoryInterface,
  ) {}
  public async create(examDto: CreateExamDto): Promise<Exam> {
    const exam = new Exam();
    Object.assign(exam, examDto);
    return await this.examRepository.create(exam);
  }

  public async list(): Promise<Exam[]> {
    return await this.examRepository.findAll();
  }

  public async delete(examDto: DeleteExamIdDto): Promise<void> {
    const result = await this.examRepository.remove(examDto.id);

    if (result.affected === 0)
      throw new HttpException('the exam with this id does not exist', 404);
  }

  public async findOne(examDto: FindOneExamIdDto): Promise<Exam> {
    const exam = await this.examRepository.findById(examDto.id);

    if (!exam)
      throw new HttpException('the exam with this id does not exist', 404);

    return exam;
  }

  public async update(
    examIdDto: UpdateExamIdDto,
    examDto: UpdateExamDto,
  ): Promise<void> {
    const result = await this.examRepository.update(examIdDto.id, examDto);
    if (result.affected === 0)
      throw new HttpException('the exam with this id does not exist', 404);
  }
}
