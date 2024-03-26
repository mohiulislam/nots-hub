import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';

@Injectable()
export class BackupService implements OnModuleInit {
  @Cron('0 * * * *')
  handleCron() {
    this.executeBackup();
  }

  onModuleInit() {
    this.executeBackup();
  }

  private executeBackup() {
    const backupCommand =
      '"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongodump.exe" --uri="mongodb+srv://mohiulislam900:ocwBMSvwo4QiraKi@mynoteshub.jxazvem.mongodb.net/?retryWrites=true&w=majority&appName=MyNotesHub" --out="backup" --gzip';
    exec(backupCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing backup: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Backup stderr: ${stderr}`);
        return;
      }
      console.log(`Backup stdout: ${stdout}`);
    });
  }
}
