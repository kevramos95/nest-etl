import { Module } from '@nestjs/common';
import { SqlService } from './database/connections/sql.service';
import { EtlService } from './etl/etl.service';

@Module({
  providers: [SqlService, EtlService],
})
export class AppModule {}
