import { Controller, Get, Post } from '@nestjs/common';
import { IssueService } from './issue.service';


@Controller('issues')
export class IssueController {
  constructor(private service: IssueService) {}

  @Get('/with-drizzle')
  async createIssueWithDrizzle() {
    this.service.createIssueWithDrizzle();
  }

  @Get('/with-sequelize')
  async createIssueWithSequelize() {
    this.service.createIssueWithSequelize();
  }
}
