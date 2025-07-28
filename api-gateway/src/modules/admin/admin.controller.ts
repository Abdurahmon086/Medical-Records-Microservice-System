import { Controller, Post, Body, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  createAdmin(@Body() data: any) {
    return this.adminService.createAdmin(data);
  }

  @Get()
  listAdmins() {
    return this.adminService.listAdmins();
  }
}
