import { Question } from 'src/modules/question/entity/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'options' })
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  key: string;

  @Column({ nullable: false, type: 'varchar' })
  value: string;

  @Column({ nullable: false, type: 'boolean' })
  correct: boolean;

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  question: Question;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
