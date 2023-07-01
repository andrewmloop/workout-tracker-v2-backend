import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Routine } from './schemas/routine.schema';
import { Model, Types } from 'mongoose';
import { AddExerciseDto } from './dto/add-exercise.dto';

@Injectable()
export class RoutineService {
  constructor(
    @InjectModel(Routine.name) private routineModel: Model<Routine>,
  ) {}

  async create(user, createRoutineDto: CreateRoutineDto): Promise<Routine> {
    const newRoutine = {
      userId: user['sub'],
      ...createRoutineDto,
    };
    return await this.routineModel.create(newRoutine);
  }

  async findAll(userId: Types.ObjectId): Promise<Routine[]> {
    return await this.routineModel.find({ userId: userId });
  }

  async findOne(id: Types.ObjectId): Promise<Routine> {
    return await this.routineModel.findById(id);
  }

  async update(
    id: Types.ObjectId,
    updateRoutineDto: UpdateRoutineDto,
  ): Promise<Routine> {
    return await this.routineModel.findByIdAndUpdate(id, updateRoutineDto, {
      new: true,
    });
  }

  async addExercise(id: Types.ObjectId, addExerciseDto: AddExerciseDto) {
    const newExerciseIdList = addExerciseDto.exerciseIds.map((id) => {
      return { exerciseId: id };
    });
    return await this.routineModel.findByIdAndUpdate(
      id,
      {
        $push: {
          exercises: {
            $each: newExerciseIdList,
          },
        },
      },
      { new: true },
    );
  }

  // TODO: remove exercises from routine

  // TODO: Add functions to set target sets on reps on exercise in routine

  async remove(id: Types.ObjectId): Promise<boolean> {
    return await this.routineModel.findByIdAndRemove(id);
  }
}
