import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admines } from './admin.entity';
import { AdminDto } from './dto/admin.dto';
import { IResponseInfo } from 'src/types';
import { DoctorService } from '../doctor/doctor.service';
import { DoctorDto } from '../doctor/dto/doctor.dto';
import { PatientService } from '../patient/patient.service';
import { Doctor } from 'src/types/doctor';
import { Patient } from 'src/types/patient';
import { PatientDto } from '../patient/dto/patient.dto';
// interface DoctorService {
//   GetDoctor(data: { id: number }): Observable<DoctorResponse>;
// }
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admines)
    private adminRepository: Repository<Admines>,
    private doctorService: DoctorService,
    private patientService: PatientService,
  ) {}

  createDoctor(dto: DoctorDto) {
    return this.doctorService.create(dto);
  }
  getDoctorList() {
    return this.doctorService.getList();
  }

  createPatient(dto: PatientDto) {
    return this.patientService.create(dto);
  }
  getPatientList() {
    return this.patientService.getList();
  }

  async createNews(dto: AdminDto): Promise<IResponseInfo<Admines>> {
    try {
      const news = await this.adminRepository.save(
        this.adminRepository.create(dto),
      );

      return {
        status: 201,
        data: news,
        message: 'News created',
      };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `Admin createNews: ${error.message}`,
      };
    }
  }
  async getNewsList(): Promise<IResponseInfo<Admines[]>> {
    try {
      const news = await this.adminRepository.find();

      return {
        status: 200,
        data: news,
        message: 'News geted',
      };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `Admin getNewsList: ${error.message}`,
      };
    }
  }
}
