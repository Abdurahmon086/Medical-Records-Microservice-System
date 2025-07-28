import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface PatientServiceGrpc {
  CreatePatient(data: any): any;
  GetPatient(data: any): any;
  ListPatients(data: any): any;
}

@Injectable()
export class PatientService implements OnModuleInit {
  private patientService: PatientServiceGrpc;

  constructor(@Inject('PATIENT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.patientService = this.client.getService<PatientServiceGrpc>('PatientService');
  }

  async createPatient(data: any) {
    return firstValueFrom(this.patientService.CreatePatient(data));
  }

  async getPatient(id: number) {
    return firstValueFrom(this.patientService.GetPatient({ id }));
  }

  async listPatients() {
    return firstValueFrom(this.patientService.ListPatients({}));
  }
}