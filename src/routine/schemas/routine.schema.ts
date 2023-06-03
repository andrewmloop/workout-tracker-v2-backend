import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoutineDocument = HydratedDocument<Routine>;

@Schema({
  timestamps: true,
})
export class Routine {
  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: [
      {
        exercise: {
          type: Types.ObjectId,
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
  })
  exercises: { exercise: Types.ObjectId; sets: number; reps: number }[];
}

export const RoutineSchema = SchemaFactory.createForClass(Routine);
