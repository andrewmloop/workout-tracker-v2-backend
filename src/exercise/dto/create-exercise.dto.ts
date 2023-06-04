import { IsIn, IsNotEmpty } from 'class-validator';
import {
  CATEGORY_ENUM,
  LEVEL_ENUM,
  MUSCLE_ENUM,
} from '../../utils/enums/exercise.enum';

export class CreateExerciseDto {
  @IsNotEmpty({
    message: 'A name is required',
  })
  name: string;

  @IsNotEmpty({
    message: 'A level is required',
  })
  @IsIn(LEVEL_ENUM, {
    message: 'That is not a valid level',
  })
  level: string;

  @IsNotEmpty({
    message: 'A primary muscle is required',
  })
  @IsIn(MUSCLE_ENUM, {
    message: 'That is not a valid muscle',
  })
  primaryMuscles: string[];

  @IsIn(MUSCLE_ENUM, {
    message: 'That is not a valid muscle',
  })
  secondaryMuscles: string[];

  equipment: string;

  @IsIn(CATEGORY_ENUM, {
    message: 'That is not a valid category',
  })
  category: string;

  instructions: string[];
}
