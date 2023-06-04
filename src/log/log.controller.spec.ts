import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { Types } from 'mongoose';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './schemas/log.schema';

describe('LogController', () => {
  let controller: LogController;
  let service: LogService;

  const logId = '123abc' as unknown as Types.ObjectId;
  const mockLog: Log = {
    userId: '123abc' as unknown as Types.ObjectId,
    exerciseId: '456def' as unknown as Types.ObjectId,
    reps: 10,
    weightImperial: 225,
    weightMetric: 100,
    form: 'good',
  };

  const mockCreateDto: CreateLogDto = {
    userId: '123abc' as unknown as Types.ObjectId,
    exerciseId: '456def' as unknown as Types.ObjectId,
    reps: 10,
    weightImperial: 225,
    weightMetric: 100,
    form: 'good',
  };

  const mockUpdateDto: UpdateLogDto = {
    form: 'okay',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
      providers: [
        {
          provide: LogService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockLog),
            findAll: jest.fn().mockResolvedValue([mockLog]),
            findOne: jest.fn().mockResolvedValue(mockLog),
            update: jest.fn().mockResolvedValue(mockLog),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<LogController>(LogController);
    service = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a created Log', async () => {
      const createSpy = jest.spyOn(service, 'create');
      const createdLog = await controller.create(mockCreateDto);
      expect(createSpy).toHaveBeenCalledWith(mockCreateDto);
      expect(createdLog).toEqual(mockLog);
    });
  });

  describe('findAll', () => {
    it('should return an array of Logs', async () => {
      const users = await controller.findAll();
      expect(users).toEqual([mockLog]);
    });
  });

  describe('findOne', () => {
    it('should return one Log by id', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');
      const foundLog = await controller.findOne(logId);
      expect(findOneSpy).toHaveBeenCalledWith(logId);
      expect(foundLog).toEqual(mockLog);
    });
  });

  describe('update', () => {
    it('should return an updated Log', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const updatedLog = await controller.update(logId, mockUpdateDto);
      expect(updateSpy).toHaveBeenCalledWith(logId, mockUpdateDto);
      expect(updatedLog).toEqual(mockLog);
    });
  });

  describe('remove', () => {
    it('should return true', async () => {
      const removeSpy = jest.spyOn(service, 'remove');
      const response = await controller.remove(logId);
      expect(removeSpy).toHaveBeenCalledWith(logId);
      expect(response).toEqual(true);
    });
  });
});
