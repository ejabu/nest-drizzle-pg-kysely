import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';

import { Issue } from '../../database/models';
import { IssueDrizzle } from '../../database/repositories/issue.drizzle';
import { IssueRepository } from '../../database/repositories/issue.repository';

@Module({
  imports: [SequelizeModule.forFeature([Issue])],
  controllers: [IssueController],
  providers: [IssueService, IssueDrizzle, IssueRepository],
})
export class IssueModule {}
