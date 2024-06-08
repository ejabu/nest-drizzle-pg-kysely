import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { UserRepo } from './user.repo';

@Module({
  imports: [
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [HealthService, UserRepo],
})
export class HealthModule {}
