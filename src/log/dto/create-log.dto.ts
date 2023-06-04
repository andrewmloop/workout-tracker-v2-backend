import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Types } from 'mongoose';
import { FORM_ENUM } from '../../utils/enums/log.enum';

export class CreateLogDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @IsNotEmpty()
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

  @IsEnum(FORM_ENUM)
  form: string;
}
