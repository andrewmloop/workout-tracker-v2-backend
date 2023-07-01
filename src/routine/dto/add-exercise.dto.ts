import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class AddExerciseDto {
  @IsMongoId({ each: true })
  @IsNotEmpty()
  exerciseIds: Types.ObjectId[];
}
