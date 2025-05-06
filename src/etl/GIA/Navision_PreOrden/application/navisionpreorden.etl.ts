import { fetchFromMongo } from '../../../../database/connections/mongo.dynamic';
import { EntityOrdenCompra } from '../domain/navisionpreorden.entity';
import { insertBulk, clearTable } from '../persistence/navisionpreorden.sql';
import { GiaNavisionPreOrdenConfig as config } from '../config/dimensiongia.navision_preorden.config';
import * as mssql from 'mssql';

export async function runGIANavisionPreOrdenETL(pool: mssql.ConnectionPool) {
  console.log('▶ Ejecutando ETL: proveedor');
  const registros = await fetchFromMongo(config);
  console.log('📦 Registros:', registros.length);
  await clearTable(pool);

  //adicional
  const convertNumber = (importe: number | string): number => {
    let _importe: number;
    if (typeof importe === 'string') {
        _importe = Number.parseFloat(importe);
    } else {
        _importe = importe;
    }
    return parseFloat(_importe.toFixed(4))
  };
  
  //BULK
  const entidades: EntityOrdenCompra[] = registros.map(d => new EntityOrdenCompra({
    padre_id: d._id?.toString() ?? '',
    codigo: d.Codigo ?? '',
    codigoGrupo: d.DatosEmpresa?.Grupo?.toString() ?? '',
    codigoPais: d.DatosPais?.CDPais?.toString(),
    codigoDelegacion: d.DatosTrabajo?.Delegacion?.Codigo?.toString(),
    codigoOT: d.DatosTrabajo.OT.Codigo?.toString() ?? '',
    codigoSociedad: d.DatosEmpresa.CDEmpresa?.toString() ?? '',
    codigoProveedor: d.EmpresaGanadora?.NroDocumento ?? '',
    codigoPago: d.DatosPago?.FormaPago?.Codigo?.toString() ?? '',
    codigoTipoOperacion: d.TipoOperacion?.Code ?? '',
    codigoCategoria: d.Categoria?.Code?.toString() ?? '',
    codigoFechaRegistro: d.Dates?.Registry?.IdDate?.toString() ?? '',
    codigoUsuarioRegistro: d.Users?.Registry?.IdUser?.toString() ?? '',
    codigoTipoCompra: d.TipoCompra?.Code ?? '',
    codigoMoneda: d.DatosPago?.Moneda?.Codigo ?? d.DatosPago?.Moneda?.Descripcion ?? '',
    ordenCompraNavision: d.DatosNav?.Orden ?? '',
    terminoPago: d.DatosPago?.TerminoPago?.Codigo?.toString() ?? '',
    estado: d.Status?.Solicitud?.Status?.toString() ?? '',
    factorCambio: d.DatosPago?.Importe?.FactorCambio ?? 0,
    dateFactorCambio: d.DatosPago?.Importe?.DateFactorCambio?.toString() ?? '',
    monto: d.DatosPago?.Importe?.Monto ? convertNumber(d.DatosPago.Importe.Monto) : 0,
    codigofechaAceptada: d.Dates?.Accepted?.IdDate?.toString() ?? '',
    status: d.Status?.Icono?.Status?.toString() ?? '',
    codigoUsuarioRegistroAcepta: d.Users?.Accepted?.IdUser?.toString() ?? '',
  }));
   
  await insertBulk(pool,entidades);
  

  console.log('✅ ETL navisionpreornde completado.');
}
