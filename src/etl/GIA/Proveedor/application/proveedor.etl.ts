import { fetchFromMongo } from '../../../../database/connections/mongo.dynamic';
import { ProveedorEntity } from '../domain/proveedor.entity';
//import { insertProveedor, clearProveedorTable } from '../persistence/proveedor.sql';
import { insertProveedoresBulk, clearProveedorTable } from '../persistence/proveedor.sql';
import { DimensionGiaProveedorConfig as config } from '../config/dimensiongia.proveedor.config';
import * as mssql from 'mssql';

export async function runGIAProveedorETL(pool: mssql.ConnectionPool) {
  console.log('▶ Ejecutando ETL: proveedor');
  const registros = await fetchFromMongo(config);
  console.log('📦 Registros:', registros.length);

  await clearProveedorTable(pool);
  /*for (const d of registros) {
    const entity = new ProveedorEntity(
      d._id?.toString() ?? '',
      d.IdRegister?.toString() ?? '',
      d.Name?.toString() ?? ''
    );
    await insertProveedor(pool, entity);
  }*/
  
  //BULK
  const entidades: ProveedorEntity[] = registros.map(d => new ProveedorEntity(
    d._id?.toString() ?? '',
    d.IdRegister?.toString() ?? '',
    d.Name?.toString() ?? '',
  ));
    await insertProveedoresBulk(pool,entidades);
  

  console.log('✅ ETL proveedor completado.');
}
