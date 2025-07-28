import { Controller, Post, Body, Get } from '@nestjs/common';
import { AdminDto } from './dto/admin.dto';
import { AdminService } from './admin.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('admins')
export class adminController {
  constructor(private readonly adminService: AdminService) {}

  @GrpcMethod('AdminService', 'CreateAdmin')
  create(@Body() dto: AdminDto) {
    return this.adminService.create(dto);
  }

  @GrpcMethod('AdminService', 'ListAdmins')
  findAll() {
    return this.adminService.findAll();
  }
}
