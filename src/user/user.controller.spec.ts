import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { describe } from 'node:test';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const userId = '123abc' as unknown as Types.ObjectId;
  const mockUser = {
    _id: '123abc',
    firstName: 'Valid',
    email: 'valid@email.com',
    password: 'Password1',
    useLeftHand: false,
    useMetric: false,
  };

  const mockCreateDto: CreateUserDto = {
    firstName: 'Valid',
    email: 'valid@email.com',
    password: 'Password1',
  };

  const mockUpdateDto: UpdateUserDto = {
    firstName: 'new name',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            findAll: jest.fn().mockResolvedValue([mockUser]),
            findOneById: jest.fn().mockResolvedValue(mockUser),
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
      const createSpy = jest.spyOn(service, 'create');
      const createdUser = await controller.create(mockCreateDto);
      expect(createSpy).toHaveBeenCalledWith(mockCreateDto);
      expect(createdUser).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of Users', async () => {
      const foundUsers = await controller.findAll();
      expect(foundUsers).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return one User', async () => {
      const findOneSpy = jest.spyOn(service, 'findOneById');
      const foundUser = await controller.findOne(userId);
      expect(findOneSpy).toHaveBeenCalledWith(userId);
      expect(foundUser).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update and return one User', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const updatedUser = await controller.update(userId, mockUpdateDto);
      expect(updateSpy).toHaveBeenCalledWith(userId, mockUpdateDto);
      expect(updatedUser).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should return true', async () => {
      const removeSpy = jest.spyOn(service, 'remove');
      const response = await controller.remove(userId);
      expect(removeSpy).toHaveBeenCalledWith(userId);
      expect(response).toEqual(true);
    });
  });
});
