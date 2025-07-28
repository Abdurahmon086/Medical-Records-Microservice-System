import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { VisitServiceGrpc } from 'src/types/visit';
import { VisitDto } from './dto/visit.dto';

@Injectable()
export class VisitService implements OnModuleInit {
  private visitService: VisitServiceGrpc;

  constructor(@Inject('VISIT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.visitService =
      this.client.getService<VisitServiceGrpc>('VisitService');
  }

  create(data: VisitDto) {
    return firstValueFrom(this.visitService.CreateVisit(data));
  }

  getList() {
    return firstValueFrom(this.visitService.ListVisits({}));
  }

  getOne(id: number) {
    return firstValueFrom(this.visitService.GetVisit({ id }));
  }

  remove(id: number) {
    return firstValueFrom(this.visitService.RemoveVisit({ id }));
  }
}
