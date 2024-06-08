import { Injectable } from '@nestjs/common';

import { UserRepo } from './user.repo';

import { poolpool } from '../../utils/Poolpool';
import UUID from '../../utils/uuid.util';

@Injectable()
export class HealthService {
  constructor(private readonly userRepo: UserRepo) {}

  async getUsers() {
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
      const res = await this.userRepo.bulkUpsert(issues, trx);
      await trx.commit();
      return res;
    } catch (error) {
      await trx.rollback();
    }
  }
}
