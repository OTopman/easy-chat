import dotenvExtended from 'dotenv-extended';
import dotenvParseVariables from 'dotenv-parse-variables';
import { AppConfig } from './interface';
import { Environment, LogLevel } from './type';

const env = dotenvExtended.load({
  path: '.env',
  defaults: './envs/defaults.env',
  schema: './envs/schema.env',
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true,
});

const parsedEnv = dotenvParseVariables(env);

const config: AppConfig = {
  app: {
    loglevel: parsedEnv.LOGGER_LEVEL as LogLevel,
    applogger: parsedEnv.APP_LOGGER as boolean,
    environment: parsedEnv.NODE_ENV as Environment,
    host: parsedEnv.HOST as string,
    port: parsedEnv.PORT as number,
  },
  mysql: {
    username: parsedEnv.DATABASE_USER as string,
    password: parsedEnv.DATABASE_PASSWORD as string,
    port: parsedEnv.DATABASE_PORT as number,
    host: parsedEnv.DATABASE_HOST as string,
    database: parsedEnv.DATABASE_NAME as string,
  },
  morgan: {
    logger: parsedEnv.MORGAN_LOGGER as boolean,
    body: parsedEnv.MORGAN_BODY_LOGGER as boolean,
  },
};

export default config;

