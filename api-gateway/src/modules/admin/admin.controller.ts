import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminDto } from './dto/admin.dto';
import { AdminService } from './admin.service';
import { PatientDto } from '../patient/dto/patient.dto';
import { DoctorDto } from '../doctor/dto/doctor.dto';
import { GetDoctorDto } from '../doctor/dto/doctor.dto';
import { GetPatientDto } from '../patient/dto/patient.dto';

@ApiTags('Admin') // Swagger da guruhlash uchun
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('doctor')
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiResponse({ status: 201, description: 'Doctor created.', type: DoctorDto })
  @ApiResponse({ status: 500, description: 'Server error' })
  createDoctor(@Body() dto: DoctorDto) {
    return this.adminService.createDoctor(dto);
  }

  @Get('doctor')
  @ApiOperation({ summary: 'Get doctor list' })
  @ApiResponse({
    status: 200,
    description: 'Doctors geted.',
    type: [GetDoctorDto],
  })
  getDoctorList() {
    return this.adminService.getDoctorList();
  }

  @Post('patient')
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({
    status: 201,
    description: 'Patient created.',
    type: PatientDto,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  createPatient(@Body() dto: PatientDto) {
    return this.adminService.createPatient(dto);
  }

  @Get('patient')
  @ApiOperation({ summary: 'Get patient list' })
  @ApiResponse({
    status: 200,
    description: 'Patients geted.',
    type: [GetPatientDto],
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  getPatientList() {
    return this.adminService.getPatientList();
  }

  @Post('news')
  @ApiOperation({ summary: 'Create a news article' })
  @ApiResponse({ status: 201, description: 'News created.' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @ApiBody({ type: AdminDto })
  createNews(@Body() dto: AdminDto) {
    return this.adminService.createNews(dto);
  }

  @Get('news')
  @ApiOperation({ summary: 'Get news list' })
  @ApiResponse({
    status: 200,
    description: 'NewsList geted.',
    type: [GetPatientDto],
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  getNewsList() {
    return this.adminService.getNewsList();
  }
}
