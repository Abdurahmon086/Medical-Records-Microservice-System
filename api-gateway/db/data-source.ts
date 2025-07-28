import { Admines } from 'src/modules/admin/admin.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptins: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: String(process.env.DB_PASSWORD || '1230'),
  database: process.env.DB_NAME || 'admin-db',
  entities: [Admines],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptins);

export default dataSource;
