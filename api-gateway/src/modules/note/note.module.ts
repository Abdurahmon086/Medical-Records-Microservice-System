import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'note',
          protoPath: join(process.cwd(), 'src/proto/note.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
