import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { Logger } from 'winston';
import { winstonConfig } from '@src/config/winston.config';

@Injectable()
export class LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = winston.createLogger(winstonConfig);
  }

  debug(message: string, context?: string): void {
    this.logger.debug(message, { context });
  }

  http(message: string, context?: string): void {
    this.logger.http(message, { context });
  }

  info(message: string, context?: string): void {
    this.logger.info(message, { context });
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, { context });
  }

  error(message: string, trace: string, context?: string): void {
    this.logger.error(message, { trace, context });
  }

  fatal(message: string, trace: string, context?: string): void {
    this.logger.log('fatal', message, { trace, context });
  }
}
