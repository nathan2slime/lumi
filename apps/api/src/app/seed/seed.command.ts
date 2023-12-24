import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { SeedService } from './seed.service';

@Injectable()
export class SeedCommand {
  constructor(private seedService: SeedService) {}

  @Command({
    command: 'seed:run',
    describe: 'Create user admin',
  })
  async seed() {
    await this.seedService.admin();
  }
}
