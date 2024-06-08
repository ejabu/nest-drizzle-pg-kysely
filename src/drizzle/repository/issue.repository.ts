import { sql } from 'kysely';

import { kyselyDB } from '../database';
import { Issues, NewIssues } from '../models/issue.model';

export const getAll = (): Issues[] => {
  const query = kyselyDB
    .selectFrom('issue')
    .selectAll()
    .where('id', '=', 'QUA-333')
    .compile();

  return [];
};

export const bulkInsert = (rows: NewIssues[]) => {
  const query = kyselyDB
    .insertInto('issue')
    .values(rows)
    .onConflict((oc) =>
      oc.column('id').doUpdateSet({
        updatedAt: (eb) => sql`now()`,
        title: (eb) => eb.ref('excluded.title'),
        issueCategory: (eb) => eb.ref('excluded.issueCategory'),
      }),
    )
    .compile();

  return query;
};
