import { Body, Controller, Delete, Get, Param, Patch, Post, BadRequestException } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutsService: WorkoutService) {}

  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.create(createWorkoutDto);
  }

  @Get()
  findAll() {
    return this.workoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsService.findOne(id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    if (Object.keys(updateWorkoutDto).length === 0) {
      throw new BadRequestException('Request body cannot be empty');
    }
    return this.workoutsService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.workoutsService.delete(id);
  }
}
