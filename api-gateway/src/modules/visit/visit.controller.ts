import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { VisitService } from './visit.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('visits')
@Controller('visits')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  @ApiOperation({ summary: 'Create visit' })
  @ApiResponse({ status: 201, description: 'Visit created' })
  createVisit(@Body() data: any) {
    return this.visitService.createVisit(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one visit' })
  @ApiResponse({ status: 200, description: 'Visit one geted' })
  getNocreateVisit(@Param('id') id: number) {
    return this.visitService.getVisit(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Get visites' })
  @ApiResponse({ status: 200, description: 'Visites geted' })
  listNocreateVisits() {
    return this.visitService.listVisits();
  }
}
