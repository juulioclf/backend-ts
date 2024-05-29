import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('exercises')
export class ExercisesController {
    constructor (private readonly exerciseService: ExercisesService) {}


    
    @Post()
    create(@Body() createExerciseDto: CreateExerciseDto) {
        return this.exerciseService.create(createExerciseDto)
    }

    @Get()
    findAll() {
        return 'get all'
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `Procurando por id: ${id}`
    }

    @Put(':id')
    updateOne(@Param('id') id: string){
        return `Atualizando o id: ${id}`
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return `Deletando o id: ${id}`
    }


}
