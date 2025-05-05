import { ConnectionPool, Table, TYPES } from 'mssql';
import { ControlPreventivoEntity } from '../domain/controlpreventivo.entity';

export async function insertBulk(pool: ConnectionPool, data: ControlPreventivoEntity[]) {
  const table = new Table('[BD_DEV_PRUEBAS].[FactSGSO].[ControlPreventivo]');
  table.create = false;

  // Definición de columnas
  table.columns.add('padre_id', TYPES.VarChar, { length: 24, nullable: true });
  table.columns.add('codigo', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoPais', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoOT', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoDelegacion', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoEmpresa', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoActividad', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoMomento', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('codigoFechaRegistro', TYPES.VarChar, { length: 50, nullable: true });
  table.columns.add('tecnico', TYPES.VarChar, { length: 100, nullable: true });
  table.columns.add('jefetrabajo', TYPES.VarChar, { length: 100, nullable: true });
  table.columns.add('idControlPreventivo', TYPES.VarChar, { length: 100, nullable: true });
  table.columns.add('estado', TYPES.VarChar, { length: 80, nullable: true });
  table.columns.add('estadorevision', TYPES.VarChar, { length: 100, nullable: true });
  table.columns.add('puntuacion', TYPES.VarChar, { length: 100, nullable: true });
  table.columns.add('comentario', TYPES.VarChar, { length: TYPES.MAX, nullable: true });
  table.columns.add('autoridentificacion', TYPES.VarChar, { length: 100, nullable: true });
  table.columns.add('fechapuntuacion', TYPES.VarChar, { length: 100, nullable: true });
  table.columns.add('personalrevisionpdf', TYPES.VarChar, { length: 100, nullable: true });
  table.columns.add('personalrevisionaudio', TYPES.VarChar, { length: 100, nullable: true });
  table.columns.add('nombreGrupo', TYPES.NVarChar, { length: 100, nullable: true });

  // Inserción de filas
  for (const item of data) {
    table.rows.add(
      item.padre_id ?? null,
      item.codigo ?? null,
      item.codigoPais ?? null,
      item.codigoOT ?? null,
      item.codigoDelegacion ?? null,
      item.codigoEmpresa ?? null,
      item.codigoActividad ?? null,
      item.codigoMomento ?? null,
      item.codigoFechaRegistro ?? null,
      item.tecnico ?? null,
      item.jefetrabajo ?? null,
      item.idControlPreventivo ?? null,
      item.estado ?? null,
      item.estadorevision ?? null,
      item.puntuacion ?? null,
      item.comentario ?? null,
      item.autoridentificacion ?? null,
      item.fechapuntuacion ?? null,
      item.personalrevisionpdf ?? null,
      item.personalrevisionaudio ?? null,
      item.nombreGrupo ?? null,
    );
  }

  // Ejecutar inserción en bulk
  await pool.request().bulk(table);
}

export async function clearTable(pool: ConnectionPool) {
  await pool.request().query('DELETE FROM [BD_DEV_PRUEBAS].[FactSGSO].[ControlPreventivo]');
}
