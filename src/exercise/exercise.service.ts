import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise } from './schemas/exercise.schema';
import { Model, Types } from 'mongoose';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const createdExercise = await this.exerciseModel.create(createExerciseDto);
    return createdExercise;
  }

  async findAll(): Promise<Exercise[]> {
    return await this.exerciseModel.find();
  }

  async findAllByName(name: string): Promise<Exercise[]> {
    return await this.exerciseModel.find({ name: name });
  }

  async findAllByMuscle(muscle: string): Promise<Exercise[]> {
    return await this.exerciseModel.find({
      $or: [{ primaryMuscles: muscle }, { secondaryMuscles: muscle }],
    });
  }

  async findOneById(id: Types.ObjectId): Promise<Exercise> {
    return await this.exerciseModel.findById(id);
  }

  async update(
    id: Types.ObjectId,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<Exercise> {
    return await this.exerciseModel.findByIdAndUpdate(id, updateExerciseDto, {
      new: true,
    });
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    return await this.exerciseModel.findByIdAndDelete(id);
  }
}
