import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface AdminServiceGrpc {
  CreateAdmin(data: any): any;
  ListAdmins(data: any): any;
}

@Injectable()
export class AdminService implements OnModuleInit {
  private adminService: AdminServiceGrpc;

  constructor(@Inject('ADMIN_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.adminService = this.client.getService<AdminServiceGrpc>('AdminService');
  }

  async createAdmin(data: any) {
    return firstValueFrom(this.adminService.CreateAdmin(data));
  }

  async listAdmins() {
    return firstValueFrom(this.adminService.ListAdmins({}));
  }
}