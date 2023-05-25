import { IsNotEmpty } from 'class-validator';

export class SigninDTO {
  @IsNotEmpty({
    message: 'An email is required',
  })
  email: string;

  @IsNotEmpty({
    message: 'A password is required',
  })
  password: string;
}
