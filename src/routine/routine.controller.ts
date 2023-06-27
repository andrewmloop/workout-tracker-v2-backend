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
import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '../utils/pipes/parse-objectid.pipe';

@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() createRoutineDto: CreateRoutineDto,
  ) {
    const user = req['user'];
    return this.routineService.create(user, createRoutineDto);
  }

  @Get()
  async findAll() {
    return this.routineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.routineService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updateRoutineDto: UpdateRoutineDto,
  ) {
    return this.routineService.update(id, updateRoutineDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.routineService.remove(id);
  }
}
