import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { VisitService } from './visit.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VisitDto, GetVisitDto } from './dto/visit.dto';

@ApiTags('visits')
@Controller('visits')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  @ApiOperation({ summary: 'Create visit' })
  @ApiResponse({
    status: 201,
    description: 'Visit created',
    type: GetVisitDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 500, description: 'Server error' })
  create(@Body() data: VisitDto) {
    return this.visitService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all visits' })
  @ApiResponse({
    status: 200,
    description: 'Visits retrieved',
    type: GetVisitDto,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  getList() {
    return this.visitService.getList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get visit by ID' })
  @ApiResponse({
    status: 200,
    description: 'Visit retrieved',
    type: GetVisitDto,
  })
  @ApiResponse({ status: 404, description: 'Visit not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  getOne(@Param('id') id: number) {
    return this.visitService.getOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete visit' })
  @ApiResponse({ status: 200, description: 'Visit deleted' })
  @ApiResponse({ status: 404, description: 'Visit not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  remove(@Param('id') id: number) {
    return this.visitService.remove(+id);
  }
}
