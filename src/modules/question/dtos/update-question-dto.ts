import { Type } from 'class-transformer';
import {
  IsOptional,
  IsNotEmpty,
  IsUUID,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Option } from 'src/modules/option/entity/option.entity';
import { Question } from '../entity/question.entity';

export class UpdateQuestionOptionsDto extends Option {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  value: string;

  @IsOptional()
  @IsBoolean()
  correct: boolean;
}

export class UpdateQuestionDto extends Question {
  @IsOptional()
  description: string;

  @IsOptional()
  statement: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateQuestionOptionsDto)
  @IsArray()
  @ArrayMinSize(1)
  options: UpdateQuestionOptionsDto[];
}

export class UpdateQuestionIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
