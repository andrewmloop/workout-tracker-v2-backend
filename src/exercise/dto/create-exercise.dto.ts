import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  CATEGORY_ENUM,
  LEVEL_ENUM,
  MUSCLE_ENUM,
} from '../../utils/enums/exercise.enum';

export class CreateExerciseDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEnum(LEVEL_ENUM)
  level: string;

  @IsArray()
  @IsEnum(MUSCLE_ENUM, { each: true })
  primaryMuscles: string[];

  @IsArray()
  @IsOptional()
  @IsEnum(MUSCLE_ENUM, { each: true })
  secondaryMuscles: string[];

  @IsOptional()
  @IsString()
  equipment: string;

  @IsOptional()
  @IsEnum(CATEGORY_ENUM)
  category: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  instructions: string[];
}
