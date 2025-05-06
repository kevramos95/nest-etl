export class EntityOrdenCompra {
  padre_id: string;
  codigo: string;
  codigoGrupo: string;
  codigoPais?: string;
  codigoDelegacion?: string;
  codigoOT: string;
  codigoSociedad: string;
  codigoProveedor: string;
  codigoPago: string;
  codigoTipoOperacion: string;
  codigoCategoria: string;
  codigoFechaRegistro: string;
  codigoUsuarioRegistro: string;
  codigoTipoCompra: string;
  codigoMoneda: string;
  ordenCompraNavision: string;
  terminoPago: string;
  estado: string;
  factorCambio: number;
  dateFactorCambio: string;
  monto: number;
  codigofechaAceptada: string;
  status: string;
  codigoUsuarioRegistroAcepta: string;

  constructor(data: Partial<EntityOrdenCompra>) {
    Object.assign(this, data);
  }
}
