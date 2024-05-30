import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto) {
    const { name, description, items } = createWorkoutDto;

    const workout = await this.prisma.workout.create({
      data: {
        name,
        description,
      },
    });

    for (const item of items) {
      const { name: itemName, exercises } = item;
      const workoutItem = await this.prisma.workoutItem.create({
        data: {
          name: itemName,
          workoutId: workout.id,
        },
      });

      for (const exercise of exercises) {
        const { exerciseId, reps } = exercise;
        await this.prisma.workoutExercise.create({
          data: {
            workoutId: workout.id,
            workoutItemId: workoutItem.id,
            exerciseId,
            reps,
          },
        });
      }
    }

    return { message: 'Workout created successfully' };
  }

  async findAll() {
    return await this.prisma.workout.findMany({
      include: {
        workoutExercises: true,
      },
    });
  }

  async findOne(id: string) {
    const workout = await this.prisma.workout.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        workoutExercises: true,
      },
    });
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }
    return workout;
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    const { exercises, ...workoutData } = updateWorkoutDto;
    const workout = await this.prisma.workout.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    const updatedWorkout = await this.prisma.$transaction(async (prisma) => {
      const updated = await prisma.workout.update({
        where: { id: parseInt(id, 10) },
        data: { ...workoutData },
      });

      if (exercises) {
        await prisma.workoutExercise.deleteMany({
          where: { workoutId: updated.id },
        });

        const newWorkoutExercises = exercises.map((exercise) => ({
          workoutId: updated.id,
          exerciseId: exercise.exerciseId,
          reps: exercise.reps,
        }));

        await prisma.workoutExercise.createMany({
          data: newWorkoutExercises,
        });
      }

      return updated;
    });

    return updatedWorkout;
  }

  async delete(id: string) {
    const workout = await this.prisma.workout.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }
    await this.prisma.workout.delete({
      where: { id: parseInt(id, 10) },
    });
    return { message: `Workout with ID ${id} deleted successfully` };
  }
}
