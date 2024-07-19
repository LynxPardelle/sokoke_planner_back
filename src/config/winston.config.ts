import { transports, format, LoggerOptions } from 'winston';

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'magenta',
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'white',
  },
};
export const winstonConfig: LoggerOptions = {
  levels: customLevelsOptions.levels,
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize({ colors: customLevelsOptions.colors }),
        format.timestamp(),
        format.align(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    }),
    new transports.File({
      filename: './errors.log',
      level: 'error',
      format: format.simple(),
    }),
  ],
};
