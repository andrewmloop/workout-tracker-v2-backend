import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './schemas/log.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async create(
    userId: Types.ObjectId,
    createLogDto: CreateLogDto,
  ): Promise<Log> {
    const newLog: Log = {
      userId: userId,
      ...createLogDto,
    };
    return await this.logModel.create(newLog);
  }

  async findAll(userId: Types.ObjectId): Promise<Log[]> {
    return await this.logModel.find({ userId: userId });
  }

  async findAllForExercise(
    userId: Types.ObjectId,
    exerciseId: Types.ObjectId,
  ): Promise<Log[]> {
    return await this.logModel
      .find({ userId: userId, exerciseId: exerciseId })
      .sort({ createdAt: 'descending' })
      .exec();
  }

  async findOne(id: Types.ObjectId): Promise<Log> {
    return await this.logModel.findById(id);
  }

  async update(id: Types.ObjectId, updateLogDto: UpdateLogDto): Promise<Log> {
    return await this.logModel.findByIdAndUpdate(id, updateLogDto, {
      new: true,
    });
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    return await this.logModel.findByIdAndRemove(id);
  }
}
