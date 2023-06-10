import { IsString, MinLength } from 'class-validator';

export class CreateRoutineDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  description: string;
}
