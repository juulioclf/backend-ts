/*
  Warnings:

  - You are about to drop the `Program` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgramWorkout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `sets` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Program";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProgramWorkout";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkoutExercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workoutId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "reps" TEXT NOT NULL,
    CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WorkoutExercise" ("exerciseId", "id", "reps", "workoutId") SELECT "exerciseId", "id", "reps", "workoutId" FROM "WorkoutExercise";
DROP TABLE "WorkoutExercise";
ALTER TABLE "new_WorkoutExercise" RENAME TO "WorkoutExercise";
CREATE TABLE "new_Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Exercise" ("description", "id", "name") SELECT "description", "id", "name" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
CREATE TABLE "new_Workout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Workout" ("description", "id", "name") SELECT "description", "id", "name" FROM "Workout";
DROP TABLE "Workout";
ALTER TABLE "new_Workout" RENAME TO "Workout";
PRAGMA foreign_key_check("WorkoutExercise");
PRAGMA foreign_key_check("Exercise");
PRAGMA foreign_key_check("Workout");
PRAGMA foreign_keys=ON;
