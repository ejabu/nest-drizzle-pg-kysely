import { Controller, Get, Query } from '@nestjs/common';

import { IssueService } from './issue.service';

@Controller('issues')
export class IssueController {
  constructor(private service: IssueService) {}

  /**
   * Hardcoded query string and param.
   * Without Log  : 4,989 requests / sec
   * With Log     : 3,199 request / sec
   */
  @Get('/with-direct-query')
  async createIssuesDirectQuery() {
    return await this.service.createIssuesDirectQuery();
  }

  /**
   * Sequelize-generated operation.
   * Without Log  : 4,177 requests / sec
   * With Log     : 3,952 request / sec
   */
  @Get('/with-sequelize')
  async createIssueWithSequelize() {
    return await this.service.createIssueWithSequelize();
  }

  /**
   * Drizzle-generated query string and param.
   * Without Log  : 4,843 requests / sec
   * With Log     : 2,502 request / sec
   */
  @Get('/with-drizzle')
  async createIssueWithDrizzle(@Query('org_id') orgId: string) {
    return await this.service.createIssueWithDrizzle(orgId);
  }

  /**
   * Unable to fulfill the Load Test
   * Due to connections quickly reached the limit.
   */
  @Get('/with-native-client')
  async createIssueWithNativeClient() {
    return await this.service.createIssueWithNativeClient();
  }

  /**
   * Hardcoded query string and param.
   * Without Log  : 4,843 requests / sec
   * With Log     : 2,458 request / sec
   */
  @Get('/with-native-pool')
  async createIssueWithNativePool() {
    return await this.service.createIssueWithNativePool();
  }

}
