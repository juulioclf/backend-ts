import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutItemDto } from './create-workout-item.dto';

export class CreateWorkoutDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutItemDto)
  items: CreateWorkoutItemDto[];
}