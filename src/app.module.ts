import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import AppConfig from './config/app.config';
import { HealthModule } from './modules/health/health.module';
import { IssueModule } from './modules/issue/issue.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => {
        return cfg.getOrThrow('sequelize');
      },
      inject: [ConfigService],
    }),
    HealthModule,
    IssueModule,
  ],
})
export class AppModule {}
