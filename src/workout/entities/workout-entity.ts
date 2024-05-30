import { WorkoutExercise } from "src/exercises/entities/workout-exercise.entity";

export class workout {
    id: number;
    name?: string;
    description?: string;
    createdAt?: string
    workoutExercice: WorkoutExercise[];
}