import { DataSource } from 'typeorm';
import config from '../configs';
import { Message } from './Message';

export const AppRepository = new DataSource({
  type: 'mysql',
  host: config.mysql.host,
  port: config.mysql.port,
  username: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.database,
  // logging: true,
  synchronize: true,
  entities: [Message],
  // subscribers: [],
  // migrations: [],
});

