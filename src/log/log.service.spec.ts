import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from './log.service';
import { Log } from './schemas/log.schema';
import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

describe('LogService', () => {
  let service: LogService;
  let model: Model<Log>;

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
      providers: [
        LogService,
        {
          provide: getModelToken(Log.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockLog),
            find: jest.fn().mockResolvedValue([mockLog]),
            findById: jest.fn().mockResolvedValue(mockLog),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockLog),
            findByIdAndRemove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<LogService>(LogService);
    model = module.get<Model<Log>>(getModelToken(Log.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a created Log', async () => {
    const createSpy = jest.spyOn(model, 'create');
    const createdLog = await service.create(mockCreateDto);
    expect(createSpy).toHaveBeenCalledWith(mockCreateDto);
    expect(createdLog).toEqual(mockLog);
  });

  it('should return an array of all Logs', async () => {
    const foundLogs = await service.findAll();
    expect(foundLogs).toEqual([mockLog]);
  });

  it('should return one Log by Id', async () => {
    const findOneSpy = jest.spyOn(model, 'findById');
    const foundLog = await service.findOne(logId);
    expect(findOneSpy).toHaveBeenCalledWith(logId);
    expect(foundLog).toEqual(mockLog);
  });

  it('should return an updated Log', async () => {
    const updateSpy = jest.spyOn(model, 'findByIdAndUpdate');
    const updatedLog = await service.update(logId, mockUpdateDto);
    expect(updateSpy).toHaveBeenCalledWith(logId, mockUpdateDto, { new: true });
    expect(updatedLog).toEqual(mockLog);
  });

  it('should return a true when removing a Log', async () => {
    const removeSpy = jest.spyOn(model, 'findByIdAndRemove');
    const response = await service.remove(logId);
    expect(removeSpy).toHaveBeenCalledWith(logId);
    expect(response).toEqual(true);
  });
});
