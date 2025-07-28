import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { dataSourceOptins } from 'db/data-source';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorService } from './doctor/doctor.service';
import { Doctor } from './doctor/doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptins),
    TypeOrmModule.forFeature([Doctor]),
    DoctorModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class AppModule {}
