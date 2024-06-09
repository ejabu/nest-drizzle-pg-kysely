import { Controller, Get, Post } from '@nestjs/common';

import { IssueService } from './issue.service';

@Controller('issues')
export class IssueController {
  constructor(private service: IssueService) {}

  /**
   * 6,352 requests / sec
   */
  @Get('/with-sequelize')
  async createIssueWithSequelize() {
    this.service.createIssueWithSequelize();
  }

  /**
   * 4,181 requests / sec
   */
  @Get('/with-direct-query')
  async createIssuesDirectQuery() {
    this.service.createIssuesDirectQuery();
  }

  /**
   * 2,069 requests / sec
   */
  @Get('/with-drizzle')
  async createIssueWithDrizzle() {
    this.service.createIssueWithDrizzle();
  }

}
