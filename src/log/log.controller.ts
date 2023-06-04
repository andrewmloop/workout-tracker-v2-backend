import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  async create(@Body() createLogDto: CreateLogDto) {
    return await this.logService.create(createLogDto);
  }

  @Get()
  async findAll() {
    return await this.logService.findAll();
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
