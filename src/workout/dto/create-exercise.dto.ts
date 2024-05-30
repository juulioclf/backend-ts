import { IsNumber, IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsNumber()
  exerciseId: number;

  @IsString()
  reps: string;
}