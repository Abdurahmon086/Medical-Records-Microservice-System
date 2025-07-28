import { Controller } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDto } from './dto/note.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @GrpcMethod('NoteService', 'CreateNote')
  create(dto: NoteDto) {
    return this.noteService.create(dto);
  }

  @GrpcMethod('NoteService', 'ListNotes')
  getList() {
    return this.noteService.getList();
  }

  @GrpcMethod('NoteService', 'GetNote')
  getOne(id: number) {
    return this.noteService.getOne(+id);
  }

  @GrpcMethod('NoteService', 'RemoveNote')
  remove(id: number) {
    return this.noteService.remove(+id);
  }
}
