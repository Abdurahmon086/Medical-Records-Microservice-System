import { Controller } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto/patient.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @GrpcMethod('PatientService', 'CreatePatient')
  create(dto: PatientDto) {
    return this.patientService.create(dto);
  }

  @GrpcMethod('PatientService', 'ListPatients')
  getList() {
    return this.patientService.getList();
  }

  @GrpcMethod('PatientService', 'GetPatient')
  getOne(id: number) {
    return this.patientService.getOne(+id);
  }

  @GrpcMethod('PatientService', 'RemovePatient')
  remove(id: number) {
    return this.patientService.remove(+id);
  }
}
