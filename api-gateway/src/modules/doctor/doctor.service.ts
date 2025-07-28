import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { DoctorDto } from './dto/doctor.dto';
import { DoctorServiceGrpc } from 'src/types/doctor';


@Injectable()
export class DoctorService implements OnModuleInit {
  private doctorService: DoctorServiceGrpc;

  constructor(@Inject('DOCTOR_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.doctorService =
      this.client.getService<DoctorServiceGrpc>('DoctorService');
  }

  create(data: DoctorDto) {
    return firstValueFrom(this.doctorService.CreateDoctor(data));
  }

  getList() {
    return firstValueFrom(this.doctorService.ListDoctors({}));
  }

  getOne(id: number) {
    return firstValueFrom(this.doctorService.GetDoctor({ id }));
  }

  update(id: number, data: DoctorDto) {
    return firstValueFrom(this.doctorService.UpdateDoctor({ id, data }));
  }

  remove(id: number) {
    return firstValueFrom(this.doctorService.RemoveDoctor({ id }));
  }
}
