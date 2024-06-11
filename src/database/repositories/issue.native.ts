import { Injectable, Logger } from '@nestjs/common';
import { Client, Pool } from 'pg';

import { generateParam, generateQuery } from '../../utils/query-builder';

const thePool = new Pool({
  database: 'horizontal1',
  user: 'newuser',
  password: 'admin',
  host: 'localhost',
  port: 25432,
  max: 1, // set pool max size to 20
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
});

@Injectable()
export class IssueNative {
  async createIssuesWithClient() {
    const client = new Client({
      database: 'horizontal1',
      user: 'newuser',
      password: 'admin',
      host: 'localhost',
      port: 25432,
    });
    try {
      await client.connect();
      const result = await client.query(generateQuery, generateParam());
      return result.rowCount;
    } catch (error) {
      console.log('error =>\n', error);
    } finally {
      client.end();
    }
  }

  /**
   * Pool created once as global variable
   * Result :
   * 4,559 requests / sec
   */
  async createIssueWithPool() {
    const client = await thePool.connect();
    try {
      var result = await client.query(generateQuery, generateParam());
      return result.rowCount;
    } finally {
      client.release();
    }
  }

  /**
   * Pool created every time function is invoked
   * Result :
   * Error sorry, too many clients already
   */
  async createIssueWithSinglePool() {
    const localPool = new Pool({
      database: 'horizontal1',
      user: 'newuser',
      password: 'admin',
      host: 'localhost',
      port: 25432,
      max: 1,
      idleTimeoutMillis: 1000,
      connectionTimeoutMillis: 1000,
    });
    const client = await localPool.connect();
    try {
      var result = await client.query(generateQuery, generateParam());
      return result.rowCount;
    } catch (error) {
      console.log('error =>\n', error);
    } finally {
      client.release();
    }
  }
}
