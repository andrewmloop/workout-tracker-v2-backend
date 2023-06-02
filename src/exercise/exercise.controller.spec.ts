import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { Exercise } from './schemas/exercise.schema';
import { Types } from 'mongoose';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

describe('ExerciseController', () => {
  let controller: ExerciseController;
  let service: ExerciseService;

  const mockExercise: Exercise = {
    name: 'Test',
    level: 'int',
    primaryMuscles: new Types.Array<string>('chest', 'shoulders'),
    secondaryMuscles: new Types.Array<string>('triceps'),
    equipment: 'barbell',
    category: 'strength',
    instructions: new Types.Array<string>('Bench press.', 'Flex in the mirror'),
  };

  const mockCreateDto: CreateExerciseDto = {
    name: 'Test',
    level: 'int',
    primaryMuscles: new Types.Array<string>('chest', 'shoulders'),
    secondaryMuscles: new Types.Array<string>('triceps'),
    equipment: 'barbell',
    category: 'strength',
    instructions: new Types.Array<string>('Bench press.', 'Flex in the mirror'),
  };

  const mockUpdateDto: UpdateExerciseDto = {
    name: 'New name',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseController],
      providers: [
        {
          provide: ExerciseService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockExercise),
            findAll: jest.fn().mockResolvedValue([mockExercise]),
            findOneById: jest.fn().mockResolvedValue(mockExercise),
            findAllByName: jest.fn().mockResolvedValue(mockExercise),
            findAllByMuscle: jest.fn().mockResolvedValue(mockExercise),
            update: jest.fn().mockResolvedValue(mockExercise),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<ExerciseController>(ExerciseController);
    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a created exercise', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockExercise);

      const createdExercise = await controller.create(mockCreateDto);
      expect(createSpy).toHaveBeenCalledWith(mockCreateDto);
      expect(createdExercise).toEqual(mockExercise);
    });
  });

  describe('findAll', () => {
    it('should return an array of exercises', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockExercise]);
      const foundExercises = await controller.findAll();
      expect(foundExercises).toEqual([mockExercise]);
    });
  });

  describe('findOne', () => {
    it('should return an exercise', async () => {
      const exerciseId = '123abc' as unknown as Types.ObjectId;
      const findSpy = jest
        .spyOn(service, 'findOneById')
        .mockResolvedValue(mockExercise);
      const foundExercise = await controller.findOne(exerciseId);
      expect(findSpy).toHaveBeenCalledWith(exerciseId);
      expect(foundExercise).toEqual(mockExercise);
    });
  });

  describe('findAllByName', () => {
    it('should return an array of exercises', async () => {
      const searchName = 'test';
      const findByNameSpy = jest
        .spyOn(service, 'findAllByName')
        .mockResolvedValue([mockExercise]);
      const foundExercises = await controller.findAllByName(searchName);
      expect(findByNameSpy).toHaveBeenCalledWith(searchName);
      expect(foundExercises).toEqual([mockExercise]);
    });
  });

  describe('findAllByMuscle', () => {
    it('should return an array of exercises', async () => {
      const searchMuscle = 'chest';
      const findByMuscleSpy = jest
        .spyOn(service, 'findAllByMuscle')
        .mockResolvedValue([mockExercise]);
      const foundExercises = await controller.findAllByMuscle(searchMuscle);
      expect(findByMuscleSpy).toHaveBeenCalledWith(searchMuscle);
      expect(foundExercises).toEqual([mockExercise]);
    });
  });

  describe('update', () => {
    it('should return an exercise', async () => {
      const exerciseId = '123abc' as unknown as Types.ObjectId;
      const updateSpy = jest
        .spyOn(service, 'update')
        .mockResolvedValue(mockExercise);
      const updatedExercise = await controller.update(
        exerciseId,
        mockUpdateDto,
      );
      expect(updateSpy).toHaveBeenCalledWith(exerciseId, mockUpdateDto);
      expect(updatedExercise).toEqual(mockExercise);
    });
  });

  describe('delete', () => {
    it('should return a boolean', async () => {
      const exerciseId = '123abc' as unknown as Types.ObjectId;
      const updateSpy = jest.spyOn(service, 'remove').mockResolvedValue(true);
      const response = await controller.remove(exerciseId);
      expect(updateSpy).toHaveBeenCalledWith(exerciseId);
      expect(response).toEqual(true);
    });
  });
});
