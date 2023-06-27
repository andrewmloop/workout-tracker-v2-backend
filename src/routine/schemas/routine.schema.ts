import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Exercise } from '../../exercise/schemas/exercise.schema';
import { User } from '../../user/schemas/user.schema';

export type RoutineDocument = HydratedDocument<Routine>;

@Schema({
  timestamps: true,
})
export class Routine {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: User.name,
  })
  userId: Types.ObjectId;

  @Prop({
    required: true,
    type: String,
    minlength: 1,
  })
  name: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: [
      {
        exerciseId: {
          type: Types.ObjectId,
          ref: Exercise.name,
          required: true,
        },
        sets: {
          type: Number,
          min: 0,
          max: 999,
        },
        reps: {
          type: Number,
          min: 0,
          max: 999,
        },
      },
    ],
    default: [],
  })
  exercises: { exerciseId: Types.ObjectId; sets: number; reps: number }[];
}

export const RoutineSchema = SchemaFactory.createForClass(Routine);
