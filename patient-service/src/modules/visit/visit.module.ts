import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './visit.entity';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { Patient } from '../patient/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visit, Patient])],
  providers: [VisitService],
  controllers: [VisitController],
  exports: [VisitService],
})
export class VisitModule {}
