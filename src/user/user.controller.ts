import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { MongoServerErrorFilter } from '../utils/filters/mongo-server-error.filter';
import { ParseObjectIdPipe } from '../utils/pipes/parse-objectid.pipe';
import { Public } from '../utils/decorators/public.decorator';
import { UserDocument } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @UseFilters(MongoServerErrorFilter)
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = (await this.userService.create(
      createUserDto,
    )) as UserDocument;
    // Call user's toObject to remove password field before sending back
    return newUser.toObject();
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    const foundUser = (await this.userService.findOneById(id)) as UserDocument;
    // Call user's toObject to remove password field before sending back
    return foundUser.toObject();
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = (await this.userService.update(
      id,
      updateUserDto,
    )) as UserDocument;
    // Call user's toObject to remove password field before sending back
    return updatedUser.toObject();
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return await this.userService.remove(id);
  }
}
