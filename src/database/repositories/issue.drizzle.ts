import { Injectable, Logger } from '@nestjs/common';

import { NewIssues } from '../../drizzle/models/issue.model';
import { bulkInsert } from '../../drizzle/repository/issue.repository';
import { Transaction } from '../../utils/Poolpool';

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
}
