import { Environment, LogLevel } from './type';

export interface AppConfig {
  app: {
    port: number;
    host: string;
    environment: Environment;
    loglevel: LogLevel;
    applogger: boolean;
  };

  mysql: {
    username: string;
    password: string;
    port: number;
    host: string;
    database: string;
  };

  morgan: {
    logger: boolean;
    body: boolean;
  };

  
}
