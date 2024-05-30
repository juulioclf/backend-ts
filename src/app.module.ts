import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutService } from './workout/workout.service';
import { WorkoutController } from './workout/workout.controller';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ExercisesModule, WorkoutModule],
  controllers: [AppController, WorkoutController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    WorkoutService
  ],
})
export class AppModule {}
