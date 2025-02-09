import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
