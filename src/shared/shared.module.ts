import { Module } from '@nestjs/common';
/* Services */
import { LoggerService } from './services/logger.service';
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class SharedModule {}
