import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercises')
export class ExercisesController {
    constructor (private readonly exerciseService: ExercisesService) {}

    @Post()
    create(@Body() createExerciseDto: CreateExerciseDto) {
        return this.exerciseService.create(createExerciseDto)
    };

    @Get()
    findAll() {
        return this.exerciseService.findAll();
    };

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.exerciseService.findOne(id);
    };

    @Patch(':id')
    updateOne(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto){
        return this.exerciseService.update(id, updateExerciseDto);
    };

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.exerciseService.delete(id);
    };
}
