import { Admin } from 'src/modules/admin/admin.entity';
import { Note } from 'src/modules/note/note.entity';
import { Patient } from 'src/modules/patient/patient.entity';
import { Visit } from 'src/modules/visit/visit.entity';
import { DataSource, DataSourceOptions } from 'typeorm';


export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1230',
  database: 'patient', 
  entities: [Patient, Visit, Note, Admin],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;