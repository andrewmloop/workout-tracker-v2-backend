import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';

const mockUser = {
  _id: '123abc',
  firstName: 'Valid',
  email: 'valid@email.com',
  password: 'Password1',
  useLeftHand: false,
  useMetric: false,
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
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
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
    jest.spyOn(model, 'create').mockImplementationOnce(async () => {
      return Promise.resolve({
        _id: mockUser._id,
        firstName: 'Valid',
        email: 'valid@email.com',
        password: 'Password1',
        useMetric: false,
        useLeftHand: false,
      } as any);
    });

    const newUser = await service.create({
      firstName: 'Valid',
      email: 'valid@email.com',
      password: 'Password1',
    });
    expect(newUser).toEqual(mockUser);
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockResolvedValue([mockUser]);
    const returnedUsers = await service.findAll();
    expect(returnedUsers).toEqual([mockUser]);
  });

  it('should return one user by id', async () => {
    jest.spyOn(model, 'findById').mockResolvedValue(mockUser);
    const returnedUser = await service.findOneById(
      '123abc' as unknown as Types.ObjectId,
    );
    expect(returnedUser).toEqual(mockUser);
  });

  it('should return one user by email', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValue(mockUser);
    const returnedUser = await service.findOneByEmail('email@email.com');
    expect(returnedUser).toEqual(mockUser);
  });

  it('should update a user', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(mockUser);
    const updatedUser = await service.update(
      '123abc' as unknown as Types.ObjectId,
      mockUser,
    );
    expect(updatedUser).toEqual(mockUser);
  });

  it('should delete a user', async () => {
    jest.spyOn(model, 'findByIdAndRemove').mockResolvedValue(true);
    expect(await service.remove('123abc' as unknown as Types.ObjectId)).toEqual(
      true,
    );
  });
});
