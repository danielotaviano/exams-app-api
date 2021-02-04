import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateQuestionOptionsDto {
  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  @IsBoolean()
  correct: boolean;
}

export class CreateQuestionDto {
  @IsNotEmpty()
  statement: string;

  @IsNotEmpty()
  @IsUUID()
  examId: string;

  @ValidateNested()
  @Type(() => CreateQuestionOptionsDto)
  @IsArray()
  @ArrayMinSize(2)
  options: CreateQuestionOptionsDto[];
}
