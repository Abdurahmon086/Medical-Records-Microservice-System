import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DoctorService } from './doctor.service';
import { DoctorDto } from './dto/doctor.dto';

@Controller()
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @GrpcMethod('DoctorService', 'CreateDoctor')
  async create(data: DoctorDto) {
    return await this.doctorService.create(data);
  }

  @GrpcMethod('DoctorService', 'ListDoctors')
  async getList() {
    return await this.doctorService.getList();
  }

  @GrpcMethod('DoctorService', 'GetDoctor')
  async getOne({ id }: { id: number }) {
    return await this.doctorService.getOne(id);
  }

  @GrpcMethod('DoctorService', 'UpdateDoctor')
  async update({
    id,
    name,
    email,
  }: {
    id: number;
    name?: string;
    email?: string;
  }) {
    return await this.doctorService.update(id, { name, email });
  }

  @GrpcMethod('DoctorService', 'RemoveDoctor')
  async remove({ id }: { id: number }) {
    return await this.doctorService.remove(id);
  }
}
