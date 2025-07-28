import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { Visit } from '../visit/visit.entity';
import { NoteDto } from './dto/note.dto';
import { IResponseInfo } from 'src/types';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    @InjectRepository(Visit)
    private visitRepository: Repository<Visit>,
  ) {}

  async create(dto: NoteDto): Promise<IResponseInfo<Note>> {
    try {
      const visit = await this.visitRepository.findOneBy({ id: dto.visit_id });

      if (!visit) {
        throw new NotFoundException(`Visit with ID ${dto.visit_id} not found`);
      }

      const note = await this.noteRepository.save(
        this.noteRepository.create({
          text: dto.text,
          visit_id: dto.visit_id,
          visit,
        }),
      );

      return { status: 201, data: note, message: 'Note Created' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `Note create ${error.message}`,
      };
    }
  }

  async getList(): Promise<IResponseInfo<Note[]>> {
    try {
      const notes = await this.noteRepository.find({ relations: ['visit'] });

      return { status: 200, data: notes, message: 'Notes geted' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `Note getList ${error.message}`,
      };
    }
  }

  async getOne(id: number): Promise<IResponseInfo<Note>> {
    try {
      const note = await this.noteRepository.findOne({
        where: { id },
        relations: ['visit'],
      });

      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }

      return { status: 200, data: note, message: 'Get one note' };
    } catch (error) {
      return {
        status: 500,
        data: null,
        message: `Note getOne ${error.message}`,
      };
    }
  }

  async remove(id: number): Promise<IResponseInfo<boolean>> {
    try {
      const note = await this.noteRepository.findOneBy({ id });

      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }

      await this.noteRepository.remove(note);

      return { status: 200, data: true, message: 'Note removed' };
    } catch (error) {
      return {
        status: 500,
        data: false,
        message: `Note remove ${error.message}`,
      };
    }
  }
}
