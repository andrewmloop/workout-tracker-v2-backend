import { Test, TestingModule } from '@nestjs/testing';
import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';
import { Routine } from './schemas/routine.schema';
import { Types } from 'mongoose';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

describe('RoutineController', () => {
  let controller: RoutineController;
  let service: RoutineService;

  const routineId = '123abc' as unknown as Types.ObjectId;
  const mockRoutine: Routine = {
    name: 'Test',
    description: 'A test routine',
    exercises: [
      {
        exerciseId: '123abc' as unknown as Types.ObjectId,
        sets: 3,
        reps: 8,
      },
    ],
  };

  const mockCreateDto: CreateRoutineDto = {
    name: 'Test',
    description: 'A test routine',
    exercises: [
      {
        exercise: '123abc' as unknown as Types.ObjectId,
        sets: 3,
        reps: 8,
      },
    ],
  };

  const mockUpdateDto: UpdateRoutineDto = {
    name: 'New name',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutineController],
      providers: [
        {
          provide: RoutineService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockRoutine),
            findAll: jest.fn().mockResolvedValue([mockRoutine]),
            findOne: jest.fn().mockResolvedValue(mockRoutine),
            update: jest.fn().mockResolvedValue(mockRoutine),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<RoutineController>(RoutineController);
    service = module.get<RoutineService>(RoutineService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a created routine', async () => {
    const createSpy = jest.spyOn(service, 'create');
    const createdRoutine = await controller.create(mockCreateDto);
    expect(createSpy).toHaveBeenCalledWith(mockCreateDto);
    expect(createdRoutine).toEqual(mockRoutine);
  });

  it('should return an array of all routines', async () => {
    const foundRoutines = await controller.findAll();
    expect(foundRoutines).toEqual([mockRoutine]);
  });

  it('should return a routine by id', async () => {
    const findOneSpy = jest.spyOn(service, 'findOne');
    const foundRoutine = await controller.findOne(routineId);
    expect(findOneSpy).toHaveBeenCalledWith(routineId);
    expect(foundRoutine).toEqual(mockRoutine);
  });

  it('should return an updated routine', async () => {
    const updateSpy = jest.spyOn(service, 'update');
    const updatedRoutine = await controller.update(routineId, mockUpdateDto);
    expect(updateSpy).toHaveBeenCalledWith(routineId, mockUpdateDto);
    expect(updatedRoutine).toEqual(mockRoutine);
  });

  it('should return true when removing a routine', async () => {
    const removeSpy = jest.spyOn(service, 'remove');
    const response = await controller.remove(routineId);
    expect(removeSpy).toHaveBeenCalledWith(routineId);
    expect(response).toEqual(true);
  });
});
