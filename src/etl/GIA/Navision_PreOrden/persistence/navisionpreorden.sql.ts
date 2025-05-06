import { ConnectionPool, Table, TYPES } from 'mssql';
import { EntityOrdenCompra } from '../domain/navisionpreorden.entity';


export async function insertBulk(pool: ConnectionPool, data: EntityOrdenCompra[]) {
  const table = new Table('[BD_DEV_PRUEBAS].[FactGIA].[Navision_PreOrden]');
  table.create = false;

  table.columns.add('padre_id', TYPES.VarChar, { length: 100, nullable: false });
  table.columns.add('codigo', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoGrupo', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoPais', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoDelegacion', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoOT', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoSociedad', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoProveedor', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoPago', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoTipoOperacion', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoCategoria', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoFechaRegistro', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoUsuarioRegistro', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoTipoCompra', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoMoneda', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('ordenCompraNavision', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('terminoPago', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('estado', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('factorCambio', TYPES.Float, { nullable: true });
  table.columns.add('dateFactorCambio', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('monto', TYPES.Float, { nullable: true });
  table.columns.add('codigofechaAceptada', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('status', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoUsuarioRegistroAcepta', TYPES.VarChar, { length: 50, nullable: true });

  for (const item of data) {
    table.rows.add(
      item.padre_id,
      item.codigo,
      item.codigoGrupo,
      item.codigoPais,
      item.codigoDelegacion,
      item.codigoOT,
      item.codigoSociedad,
      item.codigoProveedor,
      item.codigoPago,
      item.codigoTipoOperacion,
      item.codigoCategoria,
      item.codigoFechaRegistro,
      item.codigoUsuarioRegistro,
      item.codigoTipoCompra,
      item.codigoMoneda,
      item.ordenCompraNavision,
      item.terminoPago,
      item.estado,
      item.factorCambio,
      item.dateFactorCambio,
      item.monto,
      item.codigofechaAceptada,
      item.status,
      item.codigoUsuarioRegistroAcepta
    );
  }

  await pool.request().bulk(table);
}


export async function clearTable(pool: ConnectionPool) {
  await pool.request().query('DELETE FROM [BD_DEV_PRUEBAS].[FactGIA].[Navision_PreOrden]');
}
