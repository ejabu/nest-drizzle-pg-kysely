import { Injectable } from '@nestjs/common';

import { poolpool } from '../../utils/Poolpool';
import UUID from '../../utils/uuid.util';
import { IssueDrizzle } from '../../database/repositories/issue.drizzle';
import { IssueRepository } from '../../database/repositories/issue.repository';

@Injectable()
export class IssueService {
  constructor(
    private readonly issueDrizzle: IssueDrizzle,
    private readonly issueRepo: IssueRepository,
  ) {}

  async createIssueWithDrizzle() {
    const orgId = '10101010-d990-4ac3-80c3-8872be0a1a6c';
    const issues = [
      {
        id: UUID.generate().slice(0, 16),
        source: 'source-1',
        sourceId: '123',
        title: 'Issue 1',
        issueCategory: 'Category 1',
        issueSubcategory: 'Subcategory 1',
        category: 'Category A',
        confidence: 3,
        severity: 3,
      },
      {
        id: UUID.generate().slice(0, 16),
        source: 'source-1',
        sourceId: '124',
        title: 'Issue 2',
        issueCategory: 'Category 2',
        issueSubcategory: 'Subcategory 2',
        category: 'Category B',
        confidence: 4,
        severity: 4,
      },
    ];

    const trx = await poolpool.createTransaction(orgId);
    try {
      const res = await this.issueDrizzle.bulkUpsert(issues, trx);
      await trx.commit();
      return res;
    } catch (error) {
      await trx.rollback();
    }
  }

  async createIssueWithSequelize() {
    const orgId = '10101010-d990-4ac3-80c3-8872be0a1a6c';
    const issues = [
      {
        id: UUID.generate().slice(0, 16),
        source: 'source-1',
        sourceId: '123',
        title: 'Issue 1',
        issueCategory: 'Category 1',
        issueSubcategory: 'Subcategory 1',
        category: 'Category A',
        confidence: 3,
        severity: 3,
      },
      {
        id: UUID.generate().slice(0, 16),
        source: 'source-1',
        sourceId: '124',
        title: 'Issue 2',
        issueCategory: 'Category 2',
        issueSubcategory: 'Subcategory 2',
        category: 'Category B',
        confidence: 4,
        severity: 4,
      },
    ];

    try {
      const res = await this.issueRepo.bulkUpsert(issues);
      return res;
    } catch (error) {
      console.log('error =>\n', error);
    }
  }
}
