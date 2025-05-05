import { fetchFromMongo } from '../../../../database/connections/mongo.dynamic';
import { ControlPreventivoEntity } from '../domain/controlpreventivo.entity';
import { insertBulk, clearTable } from '../persistence/controlpreventivo.sql';
import { DimensionGiaProveedorConfig as config } from '../config/dimensionsgso.controlpreventivo.config';
import * as mssql from 'mssql';

export async function runSGSOControlPreventivoETL(pool: mssql.ConnectionPool) {
  console.log('▶ Ejecutando ETL: ControlPreventivo');
  const registros = await fetchFromMongo(config);
  console.log('📦 Registros:', registros.length);

  await clearTable(pool);

  // Mapear los registros de Mongo a instancias de ControlPreventivoEntity
  const entidades: ControlPreventivoEntity[] = registros.map(d => new ControlPreventivoEntity(
    d.padre_id ?? null,
    d.codigo ?? null,
    d.codigoPais ?? null,
    d.codigoOT ?? null,
    d.codigoDelegacion ?? null,
    d.codigoEmpresa ?? null,
    d.codigoActividad ?? null,
    d.codigoMomento ?? null,
    d.codigoFechaRegistro ?? null,
    d.tecnico ?? null,
    d.jefetrabajo ?? null,
    d.idControlPreventivo ?? null,
    d.estado ?? null,
    d.estadorevision ?? null,
    d.puntuacion ?? null,
    d.comentario ?? null,
    d.autoridentificacion ?? null,
    d.fechapuntuacion ?? null,
    d.personalrevisionpdf ?? null,
    d.personalrevisionaudio ?? null,
    d.nombreGrupo ?? null
  ));

  await insertBulk(pool, entidades);

  console.log('✅ ETL ControlPreventivo completado.');
}
