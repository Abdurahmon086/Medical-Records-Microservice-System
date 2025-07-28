import { Controller } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto/patient.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @GrpcMethod('PatientService', 'CreatePatient')
  async create(dto: PatientDto) {
    return await this.patientService.create(dto);
  }

  @GrpcMethod('PatientService', 'ListPatients')
  async cgetList() {
    return await this.patientService.getList();
  }

  @GrpcMethod('PatientService', 'GetPatient')
  async getOne({ id }: { id: number }) {
    return await this.patientService.getOne(+id);
  }

  @GrpcMethod('PatientService', 'RemovePatient')
  async remove({ id }: { id: number }) {
    return await this.patientService.remove(+id);
  }
}
