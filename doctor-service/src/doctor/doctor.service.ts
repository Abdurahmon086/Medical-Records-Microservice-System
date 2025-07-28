import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { IResponseInfo } from 'src/types';
import { DoctorDto } from './dto/doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(dta: DoctorDto): Promise<IResponseInfo<Doctor>> {
    try {
      const haveDoctor = await this.doctorRepository.findOne({
        where: { email: dta.email },
      });

      if (haveDoctor) {
        throw new BadRequestException(
          'The doctor at this email already exists.',
        );
      }

      const doctor = await this.doctorRepository.save(
        this.doctorRepository.create(dta),
      );

      return { status: 201, data: doctor, message: 'Doctor Created' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `doctor create ${error.message}`,
      };
    }
  }

  async getList(): Promise<IResponseInfo<Doctor[]>> {
    try {
      const doctores = await this.doctorRepository.find({
        order: {
          create_date: 'DESC',
        },
      });

      return { status: 200, data: doctores, message: 'Doctores geted' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `doctor getList ${error.message}`,
      };
    }
  }

  async getOne(id: number): Promise<IResponseInfo<Doctor>> {
    try {
      const doctor = await this.doctorRepository.findOneBy({ id });

      if (!doctor) {
        throw new BadRequestException('This doctor was not found.');
      }

      return { status: 200, data: doctor, message: 'Get one doctor' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `doctor findOne ${error.message}`,
      };
    }
  }

  async update(
    id: number,
    dta: Partial<DoctorDto>,
  ): Promise<IResponseInfo<Doctor>> {
    try {
      const doctor = await this.doctorRepository.findOneBy({ id });

      if (!doctor) {
        throw new BadRequestException('This doctor was not found.');
      }

      const haveDoctor = await this.doctorRepository.findOne({
        where: { email: dta.email },
      });

      if (haveDoctor && haveDoctor.id !== id) {
        throw new BadRequestException(
          'The doctor at this email already exists.',
        );
      }

      const updated = await this.doctorRepository.save({
        ...doctor,
        ...dta,
      });

      return { status: 200, data: updated, message: 'Doctor updated' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `doctor update ${error.message}`,
      };
    }
  }

  async remove(id: number): Promise<IResponseInfo<boolean>> {
    try {
      const doctor = await this.doctorRepository.findOneBy({ id });

      if (!doctor) {
        throw new BadRequestException('This doctor was not found.');
      }

      await this.doctorRepository.remove(doctor);

      return { status: 200, data: true, message: 'Doctor removed' };
    } catch (error) {
      return {
        status: 500,
        data: false,
        message: `doctor remove ${error.message}`,
      };
    }
  }
}
