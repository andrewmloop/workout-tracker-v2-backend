import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Exercise } from '../../exercise/schemas/exercise.schema';
import { FORM_ENUM } from '../../utils/enums/log.enum';

export type LogDocument = HydratedDocument<Log>;

@Schema({
  timestamps: true,
})
export class Log {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: User.name,
  })
  userId: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Exercise.name,
  })
  exerciseId: Types.ObjectId;

  @Prop({
    type: Number,
    min: 0,
  })
  reps: number;

  @Prop({
    type: Number,
    min: 0,
  })
  weightImperial: number;

  @Prop({
    type: Number,
    min: 0,
  })
  weightMetric: number;

  @Prop({
    default: 'good',
    type: String,
    enum: FORM_ENUM,
    // Capitalize first letter when returning as JSON
    transform: (x: string) => x[0].toUpperCase() + x.slice(1).toLowerCase(),
  })
  form: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
