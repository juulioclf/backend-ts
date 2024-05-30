import { WorkoutExercise } from "./workout-exercise.entity";

export class Exercise {
    id: number;
    name?: string;
    description?: string;
    workoutExercice: WorkoutExercise[];
}