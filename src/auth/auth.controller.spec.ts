import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { SigninDTO } from './dto/signin.dto';
import { AuthService } from './auth.service';
import exp from 'constants';

const mockSigninDTO: SigninDTO = {
  email: 'email',
  password: 'password',
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an access token', async () => {
    const signInSpy = jest.spyOn(service, 'signIn').mockResolvedValue('123');
    const response = await controller.signIn(mockSigninDTO);

    expect(signInSpy).toHaveBeenCalledWith(mockSigninDTO);
    expect(response).toEqual('123');
  });
});
