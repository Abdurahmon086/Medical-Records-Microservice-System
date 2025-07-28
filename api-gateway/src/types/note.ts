import { Observable } from 'rxjs';

export interface Note {
  id: number;
  text: string;
  visit_id: number;
  create_date: string;
  update_date: string;
}

export interface IdRes {
  id: number;
}

export interface CreateNoteDto {
  text: string;
  visit_id: number;
}

export interface UpdateNoteDto {
  id: number;
  text: string;
  visit_id: number;
}

export interface NoteList {
  notes: Note[];
}

export interface Empty {}

export interface NoteServiceGrpc {
  CreateNote(data: CreateNoteDto): Observable<Note>;
  GetNote(data: IdRes): Observable<Note>;
  ListNotes(data: Empty): Observable<NoteList>;
  RemoveNote(data: IdRes): Observable<Empty>;
}
