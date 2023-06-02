import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseService } from './exercise.service';
import { Model, Types } from 'mongoose';
import { Exercise } from './schemas/exercise.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

describe('ExerciseService', () => {
  let service: ExerciseService;
  let model: Model<Exercise>;

  const mockExercise = {
    _id: '123abc',
    name: 'Test',
    level: 'int',
    primaryMuscles: ['chest', 'shoulders'],
    secondaryMuscles: ['triceps'],
    equipment: 'barbell',
    category: 'strength',
    instructions: ['Bench press.', 'Flex in the mirror'],
  };

  const mockCreateDto: CreateExerciseDto = {
    name: 'Test',
    level: 'int',
    primaryMuscles: ['chest', 'shoulders'],
    secondaryMuscles: ['triceps'],
    equipment: 'barbell',
    category: 'strength',
    instructions: ['Bench press.', 'Flex in the mirror'],
  };

  const mockUpdateDto: UpdateExerciseDto = {
    name: 'New Name',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseService,
        {
          provide: getModelToken(Exercise.name),
          useValue: {
            new: jest.fn().mockRejectedValue(mockExercise),
            constructor: jest.fn().mockResolvedValue(mockExercise),
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
    model = module.get<Model<Exercise>>(getModelToken(Exercise.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new exercise', async () => {
    const createSpy = jest
      .spyOn(model, 'create')
      .mockImplementationOnce(async () => {
        return Promise.resolve(mockExercise) as any;
      });
    const newExercise = await service.create(mockCreateDto);
    expect(createSpy).toHaveBeenCalledWith(mockCreateDto);
    expect(newExercise).toEqual(mockExercise);
  });

  it('should find all exercises', async () => {
    jest.spyOn(model, 'find').mockResolvedValueOnce([mockExercise]);
    const foundExercises = await service.findAll();
    expect(foundExercises).toEqual([mockExercise]);
  });

  it('should find an exercise by name', async () => {
    const searchName = mockExercise.name;
    const findSpy = jest
      .spyOn(model, 'find')
      .mockResolvedValueOnce([mockExercise]);
    const foundExercise = await service.findAllByName(searchName);
    expect(findSpy).toHaveBeenCalledWith({ name: searchName });
    expect(foundExercise).toEqual([mockExercise]);
  });

  it('should find an exercise by muscle', async () => {
    const searchMuscle = mockExercise.primaryMuscles[0];
    const findSpy = jest
      .spyOn(model, 'find')
      .mockResolvedValueOnce([mockExercise]);
    const foundExercise = await service.findAllByMuscle(searchMuscle);
    expect(findSpy).toHaveBeenCalledWith({
      $or: [
        { primaryMuscles: searchMuscle },
        { secondaryMuscles: searchMuscle },
      ],
    });
    expect(foundExercise).toEqual([mockExercise]);
  });

  it('should find an exercise by id', async () => {
    const exerciseId = mockExercise._id as unknown as Types.ObjectId;
    const updateSpy = jest
      .spyOn(model, 'findById')
      .mockResolvedValueOnce(mockExercise);
    const foundExercise = await service.findOneById(exerciseId);
    expect(updateSpy).toHaveBeenCalledWith(exerciseId);
    expect(foundExercise).toEqual(mockExercise);
  });

  it('should update an exercise', async () => {
    const exerciseId = mockExercise._id as unknown as Types.ObjectId;
    const updateSpy = jest
      .spyOn(model, 'findByIdAndUpdate')
      .mockResolvedValueOnce(mockExercise);
    const foundExercise = await service.update(exerciseId, mockUpdateDto);
    expect(updateSpy).toHaveBeenCalledWith(exerciseId, mockUpdateDto, {
      new: true,
    });
    expect(foundExercise).toEqual(mockExercise);
  });

  it('should delete an exercise', async () => {
    const exerciseId = mockExercise._id as unknown as Types.ObjectId;
    const deleteSpy = jest
      .spyOn(model, 'findByIdAndDelete')
      .mockResolvedValueOnce(true);
    const response = await service.remove(exerciseId);
    expect(deleteSpy).toHaveBeenCalledWith(exerciseId);
    expect(response).toEqual(true);
  });
});
