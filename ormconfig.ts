import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['{src,dist}/**/*.entity{.ts,.js}'],
  migrations: ['{src,dist}/migrations/*{.ts,.js}'],
});
