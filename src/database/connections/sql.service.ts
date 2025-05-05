import { Injectable } from '@nestjs/common';
import * as mssql from 'mssql';

@Injectable()
export class SqlService {
  private pool: mssql.ConnectionPool;

  async connect() {
    this.pool = await mssql.connect({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    });
  }

  async close() {
    await this.pool.close();
  }

  async clearTable(table: string) {
    await this.pool.request().query(`DELETE FROM [${table}]`);
  }

  getPool(): mssql.ConnectionPool {
    return this.pool;
  }
}
