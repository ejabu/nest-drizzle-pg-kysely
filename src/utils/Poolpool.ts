import { Pool, PoolClient } from 'pg';

import { EnvConfig } from '../constants/env-config';

export class Transaction {
  client: PoolClient;
  constructor(client: PoolClient) {
    this.client = client;
    this.start();
  }

  async start() {
    await this.client.query('begin');
  }

  async rollback() {
    await this.client.query('rollback');
    this.client.release();
  }

  async commit() {
    await this.client.query('commit');
    this.client.release();
  }

  async query(queryString: string, parameters: any) {
    await this.client?.query(queryString, parameters);
  }
}

class PoolPool {
  pools: Record<string, Pool> = {};

  getDatabaseName(orgId: string) {
    if (orgId === '10101010-d990-4ac3-80c3-8872be0a1a6c') {
      return 'horizontal1';
    } else {
      return 'horizontal2';
    }
  }

  addNewClient(orgId: string) {
    const dbName = this.getDatabaseName(orgId);
    const pool = new Pool({
      database: dbName,
      user: EnvConfig.DB_USER,
      password: EnvConfig.DB_PASS,
      host: EnvConfig.DB_HOST,
      port: EnvConfig.DB_PORT,
      max: 20,
      idleTimeoutMillis: 1000,
      connectionTimeoutMillis: 1000,
    });
    this.pools[orgId] = pool;
  }

  async createTransaction(orgId: string) {
    if (!this.pools[orgId]) {
      this.addNewClient(orgId);
    }

    const poolClient = this.pools[orgId];
    const client = await poolClient?.connect();
    const transaction = new Transaction(client);
    return transaction;
  }
}

export const poolpool = new PoolPool();
