import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoutineDto {
  @IsNotEmpty({
    message: 'A routine name is needed',
  })
  name: string;

  description: string;

  exercises: { exercise: Types.ObjectId; sets: number; reps: number }[];
}
