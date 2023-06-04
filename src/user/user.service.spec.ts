import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn().mockResolvedValue([mockUser]),
            findOne: jest.fn().mockResolvedValue(mockUser),
            findById: jest.fn().mockResolvedValue(mockUser),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockUser),
            findByIdAndRemove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createSpy = jest.spyOn(model, 'create');
    const newUser = await service.create(mockCreateDto);
    expect(createSpy).toHaveBeenCalledWith(mockCreateDto);
    expect(newUser).toEqual(mockUser);
  });

  it('should return all users', async () => {
    const foundUsers = await service.findAll();
    expect(foundUsers).toEqual([mockUser]);
  });

  it('should return one user by id', async () => {
    const findByIdSpy = jest.spyOn(model, 'findById');
    const foundUser = await service.findOneById(userId);
    expect(findByIdSpy).toHaveBeenCalledWith(userId);
    expect(foundUser).toEqual(mockUser);
  });

  it('should return one user by email', async () => {
    const searchEmail = 'email@email.com';
    const findByEmailSpy = jest.spyOn(model, 'findOne');
    const foundUser = await service.findOneByEmail(searchEmail);
    expect(findByEmailSpy).toHaveBeenCalledWith({ email: searchEmail });
    expect(foundUser).toEqual(mockUser);
  });

  it('should update a user', async () => {
    const updateSpy = jest.spyOn(model, 'findByIdAndUpdate');
    const updatedUser = await service.update(userId, mockUpdateDto);
    expect(updateSpy).toHaveBeenCalledWith(userId, mockUpdateDto, {
      new: true,
    });
    expect(updatedUser).toEqual(mockUser);
  });

  it('should delete a user', async () => {
    const removeSpy = jest.spyOn(model, 'findByIdAndRemove');
    const response = await service.remove(userId);
    expect(removeSpy).toHaveBeenCalledWith(userId);
    expect(response).toEqual(true);
  });
});
