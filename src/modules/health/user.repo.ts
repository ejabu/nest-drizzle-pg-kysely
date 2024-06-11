import { Injectable, Logger } from '@nestjs/common';
import { Client, Pool } from 'pg';

import { NewIssues } from '../../drizzle/models/issue.model';
import { bulkInsert } from '../../drizzle/repository/issue.repository';
import { Transaction } from '../../utils/Poolpool';

const INSERT_QUERY = `
    INSERT INTO public."user"
    (user_id, first_name, last_name, is_active)
    VALUES(uuid_generate_v4(), 'Tes', 'Tes', NULL);
`;

@Injectable()
export class UserRepo {
  async bulkUpsert(rows: NewIssues[], trx: Transaction) {
    const query = bulkInsert(rows);
    try {
      const result = await trx.query(query.sql, query.parameters);
      return result;
    } catch (error) {
      Logger.log('Error');
    }
  }

  /**
   * @deprecated First trial of client
   */
  async insertUserWithClient() {
    const client = new Client({
      database: 'horizontal1',
      user: 'newuser',
      password: 'admin',
      host: 'localhost',
      port: 25432,
    });

    await client.connect();
    try {
      var result = await client.query(INSERT_QUERY);
    } finally {
      // client.release()
    }
    return false;
  }

  /**
   * @deprecated using Pool
   */
  async insertUserWithPool() {
    const pool = new Pool({
      database: 'horizontal1',
      user: 'newuser',
      password: 'admin',
      host: 'localhost',
      port: 25432,
      max: 1, // set pool max size to 20
      idleTimeoutMillis: 1000, // close idle clients after 1 second
      connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
    });
    const client = await pool.connect();
    try {
      var result = await client.query(INSERT_QUERY);
    } finally {
      client.release();
    }
    return true;
  }
}
