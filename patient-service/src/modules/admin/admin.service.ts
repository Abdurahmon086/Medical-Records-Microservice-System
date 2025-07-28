import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(dto: AdminDto) {
    const admin = this.adminRepository.create(dto);
    return this.adminRepository.save(admin);
  }

  async findAll() {
    return this.adminRepository.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
    return admin;
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    return this.adminRepository.remove(admin);
  }
}
