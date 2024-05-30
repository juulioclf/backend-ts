import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';

@Module({
    imports: [PrismaModule],
    controllers: [WorkoutController],
    providers: [WorkoutService]
})
export class WorkoutModule {}
