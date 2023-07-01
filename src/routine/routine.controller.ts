import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '../utils/pipes/parse-objectid.pipe';
import { AddExerciseDto } from './dto/add-exercise.dto';

@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() createRoutineDto: CreateRoutineDto,
  ) {
    const userId = req['user']['id'];
    return this.routineService.create(userId, createRoutineDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const userId = req['user']['id'];
    return this.routineService.findAll(userId);
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

  @Post(':id/add')
  async addExercise(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() addExerciseDto: AddExerciseDto,
  ) {
    return this.routineService.addExercise(id, addExerciseDto);
  }
}
