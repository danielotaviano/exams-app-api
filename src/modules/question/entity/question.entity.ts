import { Exam } from 'src/modules/exam/entity/exam.entity';
import { Option } from 'src/modules/option/entity/option.entity';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { shuffleArray } from '../utils/shuffle-array';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar' })
  statement: string;

  @ManyToOne(() => Exam, (exam) => exam.questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'examId' })
  exam: Exam;

  @Column()
  examId: string;

  @OneToMany(() => Option, (option) => option.question, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  options: Option[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @AfterLoad()
  randomizeOptions() {
    const shuffledOptions = shuffleArray(this.options);

    this.options = shuffledOptions;
  }

  @AfterLoad()
  setKeys() {
    this.options.reduce((code, crr) => {
      crr.key = String.fromCharCode(code);
      return code + 1;
    }, 97);
  }
}
