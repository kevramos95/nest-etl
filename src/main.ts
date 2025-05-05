// src/main.ts
import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EtlService } from './etl/etl.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const etlService = app.get(EtlService);

  const args = process.argv.slice(2);

  try {
    if (args.length > 0) {
      console.log(`▶ Ejecutando ETL para colección: ${args[0]}`);
      await etlService.runOne(args[0]);
    } else {
      console.log('▶ Ejecutando ETL para todas las colecciones...');
      await etlService.runAll();
    }
    console.log('✅ Proceso ETL finalizado con éxito.');
  } catch (err) {
    console.error('❌ Error durante la ejecución del ETL:', err);
  } finally {
    await app.close();
  }
}

bootstrap();