import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDTO } from './dto/signin.dto';
import { Public } from '../utils/decorators/public.decorator';
import { Response } from 'express';
import { UserDocument } from '../user/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signinDTO: SigninDTO, @Res() response: Response) {
    const user = (await this.authService.signIn(signinDTO)) as UserDocument;
    const token = await this.authService.generateToken(user);

    response.cookie('jwt', token, { httpOnly: true });
    response.send({
      // Call User's toObject to remove user's password before sending
      user: user.toObject(),
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('signout')
  async signOut(@Res() response: Response) {
    response.cookie('jwt', 'none', {
      httpOnly: true,
      expires: new Date(Date.now() + 5_000),
    });
    response.send({ success: true, message: 'User signed out successfully' });
  }
}
