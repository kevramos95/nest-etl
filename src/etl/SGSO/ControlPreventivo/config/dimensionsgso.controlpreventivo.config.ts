//config/GIA/Proveedor/dimension.proveedor.config.ts
import query from './controlpreventivo.query.json';

const uri = process.env.DATABASE_FACT_CONTROLPREVENTIVO_URI;
const db = process.env.DATABASE_FACT_CONTROLPREVENTIVO_SORUCE;
const collection = process.env.SOURCE_FACT_CONTROLPREVENTIVO;


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
