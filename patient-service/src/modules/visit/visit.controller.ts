import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { VisitService } from './visit.service';
import { VisitDto } from './dto/visit.dto';

@Controller()
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @GrpcMethod('VisitService', 'CreateVisit')
  create(data: VisitDto) {
    return this.visitService.create(data);
  }

  @GrpcMethod('VisitService', 'ListVisits')
  getList() {
    return this.visitService.getList();
  }

  @GrpcMethod('VisitService', 'GetVisit')
  findOne({ id }: { id: number }) {
    return this.visitService.findOne(id);
  }
 
  @GrpcMethod('VisitService', 'RemoveVisit')
  remove({ id }: { id: number }) {
    return this.visitService.remove(id);
  }

}