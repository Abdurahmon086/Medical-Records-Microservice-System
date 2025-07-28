import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from './visit.entity';
import { Patient } from '../patient/patient.entity';
import { VisitDto } from './dto/visit.dto';
import { IResponseInfo } from 'src/types';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private visitRepository: Repository<Visit>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(dto: VisitDto): Promise<IResponseInfo<Visit>> {
    try {
      const patient = await this.patientRepository.findOneBy({
        id: dto.patient_id,
      });

      if (!patient) {
        throw new NotFoundException(
          `Patient with ID ${dto.patient_id} not found`,
        );
      }

      const visit = await this.visitRepository.save(
        this.visitRepository.create({
          visit_date: dto.visit_date,
          patient_id: dto.patient_id,
          patient: patient,
        }),
      );
      return { status: 201, data: visit, message: 'Visit Created' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `Visit create ${error.message}`,
      };
    }
  }

  async getList(): Promise<IResponseInfo<Visit[]>> {
    try {
      const visites = await this.visitRepository.find({
        relations: ['patient', 'notes'],
      });
      return { status: 200, data: visites, message: 'Visites geted' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `Visit getList ${error.message}`,
      };
    }
  }

  async findOne(id: number): Promise<IResponseInfo<Visit>> {
    try {
      const visit = await this.visitRepository.findOne({
        where: { id },
        relations: ['patient', 'notes'],
      });
      if (!visit) {
        throw new NotFoundException(`Visit with ID ${id} not found`);
      }
      return { status: 200, data: visit, message: 'Get one visit' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `Visit findOne ${error.message}`,
      };
    }
  }

  async remove(id: number): Promise<IResponseInfo<boolean>> {
    try {
      const visit = await this.visitRepository.findOneBy({ id });

      if (!visit) {
        throw new NotFoundException(`Visit with ID ${id} not found`);
      }

      await this.visitRepository.remove(visit);

      return { status: 200, data: true, message: 'Visit removed' };
    } catch (error) {
      return {
        status: 500,
        data: false,
        message: `Visit remove ${error.message}`,
      };
    }
  }
}
