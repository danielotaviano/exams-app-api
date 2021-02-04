import { Exam } from 'src/modules/exam/entity/exam.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar' })
  statement: string;

  @ManyToOne(() => Exam, (exam) => exam.questions)
  @JoinColumn({ name: 'examId' })
  exam: Exam;

  @Column()
  examId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
