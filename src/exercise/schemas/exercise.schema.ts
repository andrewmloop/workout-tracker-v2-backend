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
    type: String,
    minlength: 1,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
    enum: LEVEL_ENUM,
  })
  level: string;

  @Prop({
    required: true,
    type: Types.Array<string>,
    enum: MUSCLE_ENUM,
  })
  primaryMuscles: string[];

  @Prop({
    type: Types.Array<string>,
    enum: MUSCLE_ENUM,
  })
  secondaryMuscles: string[];

  @Prop({
    type: String,
    minlength: 1,
  })
  equipment: string;

  @Prop({
    type: String,
    enum: CATEGORY_ENUM,
  })
  category: string;

  @Prop({
    type: Types.Array<string>,
  })
  instructions: string[];
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
