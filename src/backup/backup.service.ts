import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';

@Injectable()
export class BackupService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  @Cron('0 * * * *')
  handleCron() {
    this.executeBackup();
  }

  onModuleInit() {
    // this.executeBackup();
    // console.log(this.configService.get<string>('DATABASE_URL'));
  }

  private executeBackup() {
    const timestamp = new Date()
      .toISOString()
      .replace(/:/g, '-')
      .replace(/T/, '_')
      .split('.')[0];
    const backupDirectory = `backup/${timestamp}`;

    const backupCommand = `"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongodump.exe" --uri="${this.configService.get<string>('DATABASE_URL')}" --out="${backupDirectory}" --gzip`;
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
