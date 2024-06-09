import { Injectable, Logger } from '@nestjs/common';

import { NewIssues } from '../../drizzle/models/issue.model';
import { bulkInsert } from '../../drizzle/repository/issue.repository';
import { Transaction } from '../../utils/Poolpool';
import UUID from '../../utils/uuid.util';

@Injectable()
export class IssueDrizzle {
  async bulkUpsert(rows: NewIssues[], trx: Transaction) {
    const query = bulkInsert(rows);
    try {
      const result = await trx.query(query.sql, query.parameters);
      Logger.log('Done');
      return result;
    } catch (error) {
      Logger.log('Error');
    }
  }

  async directBulkUpsert(trx: Transaction) {
    const sql = 'insert into "issue" ("id", "source", "source_id", "title", "issue_category", "issue_subcategory", "category", "confidence", "severity") values ($1, $2, $3, $4, $5, $6, $7, $8, $9), ($10, $11, $12, $13, $14, $15, $16, $17, $18) on conflict ("id") do update set "updated_at" = now(), "title" = "excluded"."title", "issue_category" = "excluded"."issue_category"'
    const param = [
      UUID.generate().slice(0, 16), 'source-1',
      '123',              'Issue 1',
      'Category 1',       'Subcategory 1',
      'Category A',       3,
      3,                  UUID.generate().slice(0, 16),
      'source-1',         '124',
      'Issue 2',          'Category 2',
      'Subcategory 2',    'Category B',
      4,                  4
    ]

    try {
      const result = await trx.query(sql, param);
      Logger.log('Done');
      return result;
    } catch (error) {
      Logger.log('Error');
    }
  }
}
