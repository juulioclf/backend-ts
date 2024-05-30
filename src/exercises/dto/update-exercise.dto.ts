import { IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { WorkoutExercise } from '../entities/workout-exercise.entity';
import { Exercise } from '../entities/exercises.entity';

export class UpdateExerciseDto extends Exercise {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WorkoutExercise)
  workoutExercise?: WorkoutExercise[];
}
