import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateWorkoutDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  exercises?: Array<{ exerciseId: number, reps: string }>;
}
