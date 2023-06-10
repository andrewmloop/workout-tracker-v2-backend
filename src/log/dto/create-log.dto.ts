import { IsEnum, IsMongoId, IsNumber, IsOptional, Min } from 'class-validator';
import { Types } from 'mongoose';
import { FORM_ENUM } from '../../utils/enums/log.enum';

export class CreateLogDto {
  @IsMongoId()
  userId: Types.ObjectId;

  @IsMongoId()
  exerciseId: Types.ObjectId;

  @IsNumber()
  @Min(0)
  reps: number;

  @IsNumber()
  @Min(0)
  weightImperial: number;

  @IsNumber()
  @Min(0)
  weightMetric: number;

  @IsOptional()
  @IsEnum(FORM_ENUM)
  form: string;
}
