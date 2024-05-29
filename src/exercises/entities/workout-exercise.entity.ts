import { IsNumber, IsInt } from 'class-validator';

export class WorkoutExercise {
  @IsNumber()
  workoutId: number;

  @IsNumber()
  exerciseId: number;

  @IsInt()
  sets: number;

  @IsInt()
  reps: number;
}