import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { describe } from 'node:test';
import { Types } from 'mongoose';

const mockUser: User = {
  firstName: 'Valid',
  email: 'valid@email.com',
  password: 'Password1',
  useMetric: false,
  useLeftHand: false,
};

const mockUserDTO: CreateUserDto = {
  firstName: 'Valid',
  email: 'valid@email.com',
  password: 'Password1',
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            findAll: jest.fn().mockResolvedValue([mockUser]),
            findOne: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue(mockUser),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a created user', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockUser);

      const user = await controller.create(mockUserDTO);
      expect(createSpy).toHaveBeenCalledWith(mockUserDTO);
      expect(user).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of Users', async () => {
      const users = await controller.findAll();
      expect(users).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return one User', async () => {
      const mockId = '123abc' as unknown as Types.ObjectId;
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockResolvedValueOnce(mockUser);

      const user = await controller.findOne(mockId);

      expect(findOneSpy).toHaveBeenCalledWith(mockId);
      expect(user).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update and return one User', async () => {
      const mockId = '123abc' as unknown as Types.ObjectId;
      const updateSpy = jest
        .spyOn(service, 'update')
        .mockResolvedValueOnce(mockUser);

      const user = await controller.update(mockId, mockUserDTO);

      expect(updateSpy).toHaveBeenCalledWith(mockId, mockUserDTO);
      expect(user).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should return true', async () => {
      const mockId = '123abc' as unknown as Types.ObjectId;
      const removeSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce(true);

      const didRemove = await controller.remove(mockId);

      expect(removeSpy).toHaveBeenCalledWith(mockId);
      expect(didRemove).toEqual(true);
    });
  });
});
