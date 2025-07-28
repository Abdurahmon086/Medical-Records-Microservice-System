import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { NoteService } from '../note/note.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiOperation({ summary: 'Create note' })
  @ApiResponse({ status: 201, description: 'Note created' })
  createNote(@Body() data: any) {
    return this.noteService.createNote(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one note' })
  @ApiResponse({ status: 200, description: 'Note one geted' })
  getNocreateNote(@Param('id') id: number) {
    return this.noteService.getNote(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Get notees' })
  @ApiResponse({ status: 200, description: 'Notees geted' })
  listNocreateNotes() {
    return this.noteService.listNotes();
  }
}
