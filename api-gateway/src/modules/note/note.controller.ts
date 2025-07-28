import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoteDto, GetNoteDto } from './dto/note.dto';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiOperation({ summary: 'Create note' })
  @ApiResponse({
    status: 201,
    description: 'Note created',
    type: GetNoteDto,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 500, description: 'Server error' })
  create(@Body() data: NoteDto) {
    return this.noteService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  @ApiResponse({
    status: 200,
    description: 'Notes retrieved',
    type: GetNoteDto,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  getList() {
    return this.noteService.getList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get note by ID' })
  @ApiResponse({
    status: 200,
    description: 'Note retrieved',
    type: GetNoteDto,
  })
  @ApiResponse({ status: 404, description: 'Note not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  getOne(@Param('id') id: number) {
    return this.noteService.getOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete note' })
  @ApiResponse({ status: 200, description: 'Note deleted' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  remove(@Param('id') id: number) {
    return this.noteService.remove(+id);
  }
}
