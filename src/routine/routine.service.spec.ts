import { Test, TestingModule } from '@nestjs/testing';
import { RoutineService } from './routine.service';
import { Routine } from './schemas/routine.schema';
import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

describe('RoutineService', () => {
  let service: RoutineService;
  let model: Model<Routine>;

  const routineId = '123abc' as unknown as Types.ObjectId;
  const mockRoutine: Routine = {
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
      providers: [
        RoutineService,
        {
          provide: getModelToken(Routine.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockRoutine),
            find: jest.fn().mockResolvedValue([mockRoutine]),
            findById: jest.fn().mockResolvedValue(mockRoutine),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockRoutine),
            findByIdAndRemove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<RoutineService>(RoutineService);
    model = module.get<Model<Routine>>(getModelToken(Routine.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new routine', async () => {
    const createSpy = jest.spyOn(model, 'create');
    const createdRoutine = await service.create(mockCreateDto);
    expect(createSpy).toHaveBeenCalledWith(mockCreateDto);
    expect(createdRoutine).toEqual(mockRoutine);
  });

  it('should return all routines', async () => {
    const foundRoutines = await service.findAll();
    expect(foundRoutines).toEqual([mockRoutine]);
  });

  it('should return one routine by id', async () => {
    const findByIdSpy = jest.spyOn(model, 'findById');
    const foundRoutine = await service.findOne(routineId);
    expect(findByIdSpy).toHaveBeenCalledWith(routineId);
    expect(foundRoutine).toEqual(mockRoutine);
  });

  it('should update a routine', async () => {
    const udpateSpy = jest.spyOn(model, 'findByIdAndUpdate');
    const updatedRoutine = await service.update(routineId, mockUpdateDto);
    expect(udpateSpy).toHaveBeenCalledWith(routineId, mockUpdateDto, {
      new: true,
    });
    expect(updatedRoutine).toEqual(mockRoutine);
  });

  it('should delete a routine', async () => {
    const deleteSpy = jest.spyOn(model, 'findByIdAndRemove');
    const response = await service.remove(routineId);
    expect(deleteSpy).toHaveBeenCalledWith(routineId);
    expect(response).toEqual(true);
  });
});
