import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 20,
  })
  firstName: string;

  @Prop({
    required: true,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default: false,
  })
  useMetric: boolean;

  @Prop({
    default: false,
  })
  useLeftHand: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
