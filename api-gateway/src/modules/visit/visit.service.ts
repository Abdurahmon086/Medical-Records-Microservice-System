import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface VisitServiceGrpc {
  CreateVisit(data: any): any;
  GetVisit(data: any): any;
  ListVisits(data: any): any;
}

@Injectable()
export class VisitService implements OnModuleInit {
  private VisitService: VisitServiceGrpc;

  constructor(@Inject('VISIT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.VisitService = this.client.getService<VisitServiceGrpc>('VisitService');
  }

  async createVisit(data: any) {
    return firstValueFrom(this.VisitService.CreateVisit(data));
  }

  async getVisit(id: number) {
    return firstValueFrom(this.VisitService.GetVisit({ id }));
  }

  async listVisits() {
    return firstValueFrom(this.VisitService.ListVisits({}));
  }
}