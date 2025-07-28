import { Controller } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto/patient.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @GrpcMethod('PatientService', 'CreatePatient')
  async create(dto: PatientDto) {
    console.log(dto);
    return await this.patientService.create(dto);
  }

  @GrpcMethod('PatientService', 'ListPatients')
  getList() {
    return this.patientService.getList();
  }

  @GrpcMethod('PatientService', 'GetPatient')
  getOne({ id }: { id: number }) {
    return this.patientService.getOne(+id);
  }

  @GrpcMethod('PatientService', 'RemovePatient')
  remove({ id }: { id: number }) {
    return this.patientService.remove(+id);
  }
}
