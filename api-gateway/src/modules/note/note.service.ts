import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NoteServiceGrpc } from 'src/types/note';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NoteService implements OnModuleInit {
  private noteService: NoteServiceGrpc;

  constructor(@Inject('NOTE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.noteService = this.client.getService<NoteServiceGrpc>('NoteService');
  }

  create(data: NoteDto) {
    return firstValueFrom(this.noteService.CreateNote(data));
  }

  getList() {
    return firstValueFrom(this.noteService.ListNotes({}));
  }

  getOne(id: number) {
    return firstValueFrom(this.noteService.GetNote({ id }));
  }

  remove(id: number) {
    return firstValueFrom(this.noteService.RemoveNote({ id }));
  }
}
