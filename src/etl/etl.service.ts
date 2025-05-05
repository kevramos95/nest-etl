import { Injectable } from '@nestjs/common';
import { SqlService } from '../database/connections/sql.service';
import { runGIAProveedorETL } from './GIA/Proveedor/application/proveedor.etl';
import { runSGSOControlPreventivoETL } from './SGSO/ControlPreventivo/application/controlpreventivo.etl';

// import { runDimensionGiaEmpresaETL } from './GIA/Empresa/empresa.etl';
// import { runDimensionGiaContactoETL } from './GIA/Contacto/contacto.etl';


@Injectable()
export class EtlService {
  constructor(private readonly sqlService: SqlService) {}

  async runAll() {
    await this.sqlService.connect();
    const pool = this.sqlService.getPool();

    await runGIAProveedorETL(pool);
    await runSGSOControlPreventivoETL(pool);
    // await runDimensionGiaContactoETL(pool);

    await this.sqlService.close();
  }

  async runOne(nombre: string) {
    await this.sqlService.connect();
    const pool = this.sqlService.getPool();

    switch (nombre) {
      case 'dimensiongia_proveedor':
        await runGIAProveedorETL(pool);
        break;
      case 'sgso_controlpreventivo':
        await runSGSOControlPreventivoETL(pool);
        break;
      // case 'dimensiongia_contacto':
      //   await runDimensionGiaContactoETL(pool);
      //   break;
      default:
        throw new Error(`❌ ETL no implementado para la colección: ${nombre}`);
    }

    await this.sqlService.close();
  }
}
