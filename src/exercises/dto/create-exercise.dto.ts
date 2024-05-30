import { IsString, ValidateNested } from "class-validator";
import { Exercise } from "../entities/exercises.entity";
import { Type } from "class-transformer";
import { WorkoutExercise } from "../entities/workout-exercise.entity";

export class CreateExerciseDto extends Exercise {
    @IsString()
    name: string;

    @IsString()
    description?: string;
    
    @ValidateNested({ each: true })
    @Type(() => WorkoutExercise)
    workoutExercise: WorkoutExercise[];
}