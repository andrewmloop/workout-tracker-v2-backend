import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

const LEVEL_ENUM = ['beg', 'int', 'adv'];
const MUSCLE_ENUM = [
  'abdominals',
  'abductors',
  'adductors',
  'biceps',
  'calves',
  'chest',
  'forearms',
  'glutes',
  'hamstrings',
  'lats',
  'lowerback',
  'middleback',
  'neck',
  'quadriceps',
  'shoulders',
  'traps',
  'triceps',
];
const CATEGORY_ENUM = [
  'cardio',
  'olympicWeightlifting',
  'plyometrics',
  'powerlifting',
  'strength',
  'stretching',
  'strongman',
];

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
  primaryMuscles: string[];

  @Prop({
    enum: MUSCLE_ENUM,
  })
  secondaryMuscles: string[];

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
