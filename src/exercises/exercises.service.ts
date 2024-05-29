import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExercisesService {

    constructor (private readonly prisma: PrismaService) {}

    async create(createExerciseDto: CreateExerciseDto) {
        const data = {... createExerciseDto}

        const createdExercise = await this.prisma.exercise.create({data});

        return {
            ...createdExercise
        }

    }
}
