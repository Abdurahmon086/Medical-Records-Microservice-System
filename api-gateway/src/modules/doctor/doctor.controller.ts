import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DoctorDto, GetDoctorDto } from './dto/doctor.dto';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: 'Create doctor' })
  @ApiResponse({
    status: 201,
    description: 'Doctor created',
    type: GetDoctorDto,
  })
  @ApiResponse({ status: 400, description: 'Email already exists' })
  @ApiResponse({ status: 500, description: 'Server error' })
  create(@Body() data: DoctorDto) {
    return this.doctorService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get doctores' })
  @ApiResponse({
    status: 200,
    description: 'Doctores geted',
    type: GetDoctorDto,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  getlist() {
    return this.doctorService.getList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one doctor' })
  @ApiResponse({
    status: 200,
    description: 'Doctor one geted',
    type: GetDoctorDto,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  getOne(@Param('id') id: number) {
    return this.doctorService.getOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update doctor' })
  @ApiResponse({
    status: 200,
    description: 'Doctor updated',
    type: GetDoctorDto,
  })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  updateDoctor(@Param('id') id: number, @Body() data: DoctorDto) {
    return this.doctorService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete doctor' })
  @ApiResponse({ status: 200, description: 'Doctor deleted' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  removeDoctor(@Param('id') id: number) {
    return this.doctorService.remove(+id);
  }
}
