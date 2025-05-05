import { ConnectionPool, Table, TYPES } from 'mssql';
import { ProveedorEntity } from '../domain/proveedor.entity';
import * as mssql from 'mssql';

/*export async function insertProveedor(pool: mssql.ConnectionPool, data: ProveedorEntity) {
  const request = pool.request();
  request.input('id', mssql.VarChar, data.id);
  request.input('idregister', mssql.VarChar, data.idregister);
  request.input('name', mssql.VarChar, data.name);


  await request.query(`
    INSERT INTO dimension_gia_proveedor (id, idregister, name)
    VALUES (@id, @idregister, @name)
  `);
}*/

export async function insertProveedoresBulk(pool: ConnectionPool, data: ProveedorEntity[]) {
  const table = new Table('dimension_gia_proveedor');
  table.create = false;

  table.columns.add('id', TYPES.VarChar, { length: 100, nullable: false });
  table.columns.add('idregister', TYPES.VarChar, { length: 100, nullable: true });
  table.columns.add('name', TYPES.VarChar, { length: 100, nullable: true });

  for (const item of data) {
    table.rows.add(
      (item.id ?? '').toString().slice(0, 100),
      (item.idregister ?? '').toString().slice(0, 100),
      (item.name ?? '').toString().slice(0, 100)
    );
  }
  await pool.request().bulk(table);
}

export async function clearProveedorTable(pool: ConnectionPool) {
  await pool.request().query('DELETE FROM [dimension_gia_proveedor]');
}
