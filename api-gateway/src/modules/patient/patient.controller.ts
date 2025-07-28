import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientDto, GetPatientDto } from './dto/patient.dto';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create patient' })
  @ApiResponse({
    status: 201,
    description: 'Patient created',
    type: GetPatientDto,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  create(@Body() data: PatientDto) {
    return this.patientService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({
    status: 200,
    description: 'Patients retrieved',
    type: GetPatientDto,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  getList() {
    return this.patientService.getList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by ID' })
  @ApiResponse({
    status: 200,
    description: 'Patient retrieved',
    type: GetPatientDto,
  })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  getOne(@Param('id') id: number) {
    return this.patientService.getOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient' })
  @ApiResponse({ status: 200, description: 'Patient deleted' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  remove(@Param('id') id: number) {
    return this.patientService.remove(+id);
  }
}
