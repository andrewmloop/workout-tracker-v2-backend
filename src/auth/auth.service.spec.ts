import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SigninDTO } from './dto/signin.dto';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../user/schemas/user.schema';
import * as bcrypt from 'bcrypt';

const mockSigninDTO: SigninDTO = {
  email: 'email',
  password: 'password',
};

const mockUser: User = {
  firstName: 'name',
  email: 'email',
  password: 'pass',
  useMetric: false,
  useLeftHand: false,
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should throw an UnauthorizedException when a user cannot be found', async () => {
    jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(null);
    await expect(authService.signIn(mockSigninDTO)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw an UnauthorizedException when passwords do not match', async () => {
    jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(mockUser);
    await expect(authService.signIn(mockSigninDTO)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should return an access token', async () => {
    jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('123');

    const response = await authService.signIn(mockSigninDTO);
    expect(response.accessToken).toEqual('123');
  });
});
