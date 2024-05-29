import { WorkoutExercise } from "./workout-exercise.entity";

export class Exercise {
    id?: number;
    name?: string;
    description?: string;
    type?: string;
    workoutExercice: WorkoutExercise[];
}