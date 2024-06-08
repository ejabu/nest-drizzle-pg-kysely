import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import AppConfig from './config/app.config';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
      isGlobal: true,
      envFilePath: '.env',
    }),
    HealthModule,
  ],
})
export class AppModule {}
