import { Injectable } from '@nestjs/common';
import * as mssql from 'mssql';

@Injectable()
export class SqlService {
  private pool: mssql.ConnectionPool;

  async connect() {
    this.pool = await mssql.connect({
      user: 'sa',
      password: 'Pp131471483',
      server: '127.0.0.1',
      database: 'BD_DEV_PRUEBAS',
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
