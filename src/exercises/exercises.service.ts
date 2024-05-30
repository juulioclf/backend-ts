import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
    constructor (private readonly prisma: PrismaService) {};

    async create(createExerciseDto: CreateExerciseDto) {
        const data = {... createExerciseDto};

        const createdExercise = await this.prisma.exercise.create({data});

        return {
            ...createdExercise
        };

    };

    async findAll() {
        return await this.prisma.exercise.findMany();
    };

    async findOne(id: string) {
        const exercise = await this.prisma.exercise.findUnique({
            where: {id: parseInt(id, 10)},
        });

        if (!exercise) {
            throw new NotFoundException(`Exercise with ID ${id} not found`)
        }

        return exercise;
    };

    async update(id: string, updateExerciseDto: UpdateExerciseDto) {
        const exercise = await this.prisma.exercise.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!exercise) {
            throw new NotFoundException(`Exercise with ID ${id} not found`);
        }

        const updatedExercise = await this.prisma.exercise.update({
            where: { id: parseInt(id, 10) },
            data: { ...updateExerciseDto },
        });

        return updatedExercise;
    };

    async delete(id: string) {
        const exercise = await this.prisma.exercise.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!exercise) {
            throw new NotFoundException(`Exercise with ID ${id} not found`);
        }

        await this.prisma.exercise.delete({
            where: { id: parseInt(id, 10) },
        });

        return { message: `Exercise with ID ${id} deleted successfully` };
    };
};