import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsAlphanumeric()
  @IsNotEmpty({
    message: 'A name is required',
  })
  firstName: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'An email is required',
  })
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty({
    message: 'A password is required',
  })
  password: string;
}
