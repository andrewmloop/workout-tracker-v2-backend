import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '../utils/pipes/parse-objectid.pipe';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    return await this.exerciseService.create(createExerciseDto);
  }

  @Get()
  async findAll() {
    return await this.exerciseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return await this.exerciseService.findOneById(id);
  }

  @Get('/name/:name')
  async findAllByName(@Param('name') name: string) {
    return await this.exerciseService.findAllByName(name);
  }

  @Get('/muscle/:muscle')
  async findAllByMuscle(@Param('muscle') muscle: string) {
    return await this.exerciseService.findAllByMuscle(muscle);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return await this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return await this.exerciseService.remove(id);
  }
}
