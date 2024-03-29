import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './schemas/log.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async create(createLogDto: CreateLogDto): Promise<Log> {
    return await this.logModel.create(createLogDto);
  }

  async findAll(): Promise<Log[]> {
    return await this.logModel.find();
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
