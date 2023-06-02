import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  CATEGORY_ENUM,
  LEVEL_ENUM,
  MUSCLE_ENUM,
} from '../../utils/enums/exercise.enum';

export type ExerciseDocument = HydratedDocument<Exercise>;

@Schema({
  timestamps: true,
})
export class Exercise {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    enum: LEVEL_ENUM,
  })
  level: string;

  @Prop({
    required: true,
    enum: MUSCLE_ENUM,
  })
  primaryMuscles: Types.Array<string>;

  @Prop({
    enum: MUSCLE_ENUM,
  })
  secondaryMuscles: Types.Array<string>;

  @Prop({
    minlength: 1,
  })
  equipment: string;

  @Prop({
    enum: CATEGORY_ENUM,
  })
  category: string;

  @Prop()
  instructions: string[];
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
