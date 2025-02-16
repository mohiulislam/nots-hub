import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { BackupModule } from './backup/backup.module';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotesModule,
    AuthModule,
    BackupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}