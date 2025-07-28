import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PatientService } from './patient.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create patient' })
  @ApiResponse({ status: 201, description: 'Patient created' })
  createPatient(@Body() data: any) {
    return this.patientService.createPatient(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one patient' })
  @ApiResponse({ status: 200, description: 'Patient one geted' })
  getPatient(@Param('id') id: number) {
    return this.patientService.getPatient(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Get patientes' })
  @ApiResponse({ status: 200, description: 'Patientes geted' })
  listPatients() {
    return this.patientService.listPatients();
  }
}
