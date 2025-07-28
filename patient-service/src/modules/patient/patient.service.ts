import {
  Injectable,
  NotFoundException,
  BadRequestException,
  OnModuleInit,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { PatientDto } from './dto/patient.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { IResponseInfo } from 'src/types';

interface DoctorService {
  GetDoctorById(data: { id: number }): Observable<DoctorResponse>;
}

interface DoctorResponse {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class PatientService implements OnModuleInit {
  private doctorService: DoctorService;

  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @Inject('DOCTOR_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.doctorService = this.client.getService<DoctorService>('DoctorService');
  }

  async create(dto: PatientDto): Promise<IResponseInfo<Patient>> {
    try {
      const doctor = await lastValueFrom(
        this.doctorService.GetDoctorById({ id: dto.doctor_id }),
      );

      if (!doctor) {
        throw new NotFoundException('Doctor not found');
      }

      const patient = this.patientRepository.create({
        name: dto.name,
        dob: dto.dob,
        doctor_id: dto.doctor_id,
      });

      return { status: 201, data: patient, message: 'Patient Created' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `Patient create ${error.message}`,
      };
    }
  }

  async getList(): Promise<IResponseInfo<Patient[]>> {
    try {
      const patientes = await this.patientRepository.find();

      return { status: 200, data: patientes, message: 'Patientes geted' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `Patient getList ${error.message}`,
      };
    }
  }

  async getOne(id: number): Promise<IResponseInfo<Patient>> {
    try {
      const patient = await this.patientRepository.findOneBy({ id });

      if (!patient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }
      return { status: 200, data: patient, message: 'Get one patient' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `Patient getOne ${error.message}`,
      };
    }
  }

  async remove(id: number): Promise<IResponseInfo<boolean>> {
    try {
      const patient = await this.patientRepository.findOneBy({ id });

      if (!patient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }
      await this.patientRepository.remove(patient);

      return { status: 200, data: true, message: 'Patient removed' };
    } catch (error) {
      return {
        status: 500,
        data: false,
        message: `Patient remove ${error.message}`,
      };
    }
  }
}
