import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface NoteServiceGrpc {
  CreateNote(data: any): any;
  GetNote(data: any): any;
  ListNotes(data: any): any;
}

@Injectable()
export class NoteService implements OnModuleInit {
  private NoteService: NoteServiceGrpc;

  constructor(@Inject('NOTE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.NoteService = this.client.getService<NoteServiceGrpc>('NoteService');
  }

  async createNote(data: any) {
    return firstValueFrom(this.NoteService.CreateNote(data));
  }

  async getNote(id: number) {
    return firstValueFrom(this.NoteService.GetNote({ id }));
  }

  async listNotes() {
    return firstValueFrom(this.NoteService.ListNotes({}));
  }
}