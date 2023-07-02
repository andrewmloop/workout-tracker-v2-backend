import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Logger,
} from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { ParseObjectIdPipe } from '../utils/pipes/parse-objectid.pipe';
import { Types } from 'mongoose';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  async create(@Req() req: Request, @Body() createLogDto: CreateLogDto) {
    const userId = req['user']['id'];
    Logger.log(userId);
    return await this.logService.create(userId, createLogDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const userId = req['user']['id'];
    return await this.logService.findAll(userId);
  }

  @Get('/exercise/:id')
  async findAllForExercise(
    @Req() req: Request,
    @Param('id', ParseObjectIdPipe) exerciseId: Types.ObjectId,
  ) {
    const userId = req['user']['id'];
    return await this.logService.findAllForExercise(userId, exerciseId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return await this.logService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updateLogDto: UpdateLogDto,
  ) {
    return await this.logService.update(id, updateLogDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return await this.logService.remove(id);
  }
}
