import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PatientServiceGrpc } from 'src/types/patient';
import { PatientDto } from './dto/patient.dto';
import { error } from 'console';

@Injectable()
export class PatientService implements OnModuleInit {
  private patientService: PatientServiceGrpc;

  constructor(@Inject('PATIENT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.patientService =
      this.client.getService<PatientServiceGrpc>('PatientService');
  }

  create(data: PatientDto) {
    return firstValueFrom(this.patientService.CreatePatient(data));
  }

  getList() {
    return firstValueFrom(this.patientService.ListPatients({}));
  }

  getOne(id: number) {
    return firstValueFrom(this.patientService.GetPatient({ id }));
  }

  remove(id: number) {
    return firstValueFrom(this.patientService.RemovePatient({ id }));
  }
}
