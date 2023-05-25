import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { SigninDTO } from './dto/signin.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signinDTO: SigninDTO): Promise<any> {
    const user = (await this.userService.findOneByEmail(
      signinDTO.email,
    )) as UserDocument;

    if (user === null) {
      throw new UnauthorizedException();
    }

    const isMatch = await compare(signinDTO.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user._id };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
