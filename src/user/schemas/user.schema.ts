import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 20,
  })
  firstName: string;

  @Prop({
    required: true,
    type: String,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  useMetric: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  useLeftHand: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
