import { DataSource, DataSourceOptions } from 'typeorm';
import { Doctor } from '../src/doctor/doctor.entity';

export const dataSourceOptins: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1230',
  database: 'doctor',
  entities: [Doctor],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptins);

export default dataSource;
