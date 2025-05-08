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
    d._id.toString() ?? null,
    d.Id.toString() ?? null,
    d.Pais?.IdPais?.toString() ?? null,
    d.OT?.IdOT?.toString() ?? null,
    d.IdDelegacion?.toString() ?? null,
    d.Empresa?.NroDocumento?.toString() ?? null,
    d.IdActividad?.toString() ?? null,
    d.Momento?.IdMomento?.toString() ?? null,
    d.FechaRegistro?.IdFecha?.toString() ?? null,
    d.Tecnico?.Identificacion?.toString()  ?? null,
    d.JefeObraRecurso?.Identificacion?.toString() ?? null,
    d.IdControlPreventivo?.toString() ?? null,
    d.Estado?.Estado?.toString()  ?? null,
    d.estadorevision ?? null,
    d.puntuacion ?? null,
    d.comentario ?? null,
    d.autoridentificacion ?? null,
    d.fechapuntuacion ?? null,
    d.personalrevisionpdf ?? null,
    d.personalrevisionaudio ?? null,
    d.Grupo?.Grupo?.toString() ?? null
  ));

//Chunks
  const chunkSize = 10000;
  for (let i = 0; i < entidades.length; i += chunkSize) {
    const chunk = entidades.slice(i, i + chunkSize);
    console.log(`⏳ Insertando registros ${i} a ${i + chunk.length}...`);
    try {
      //Bulk
      await insertBulk(pool, chunk);
    } catch (error) {
      console.error(`❌ Error al insertar registros ${i} a ${i + chunk.length}:`, error);
    }
  }

  console.log('✅ ETL ControlPreventivo completado.');
}
