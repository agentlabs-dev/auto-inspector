import { Controller, Post, Body } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { RunTestCase } from '@/app/usecases/run-test-case';
import { RunTestDto } from './dtos/run.test.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('test.run')
  async runTest(@Body() body: RunTestDto) {
    const runTestCase = new RunTestCase();

    console.log('body', body);

    const result = await runTestCase.execute(body.startUrl, body.userStory);

    return result;
  }
}
