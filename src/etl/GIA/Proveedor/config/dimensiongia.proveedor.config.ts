//config/GIA/Proveedor/dimension.proveedor.config.ts
import query from './proveedor.query.json';

const uri = process.env.DATABASE_DIMENSIONGIA_PROVEEDOR_URI;
const db = process.env.DATABASE_DIMENSIONGIA_PROVEEDOR_SORUCE;
const collection = process.env.SOURCE_DIMENSIONGIA_PROVEEDOR;


if (!uri) throw new Error('❌ DATABASE_DIMENSIONGIA_PROVEEDOR_URI no está definido');
if (!db) throw new Error('❌ DATABASE_DIMENSIONGIA_PROVEEDOR_SORUCE no está definido');
if (!collection) throw new Error('❌ SOURCE_DIMENSIONGIA_PROVEEDOR no está definido');
if (!query) throw new Error('❌ QUERY_DIMENSIONGIA_PROVEEDOR no está definido');



export const DimensionGiaProveedorConfig = {
  mongoUri: uri,
  mongoDb: db,
  mongoCollection: collection,
  mongoQuery: query
};
