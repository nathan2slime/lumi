import { Injectable } from '@nestjs/common';
import { Arg, Query, Resolver } from 'type-graphql';

import { ClientService } from './client.service';
import { Clients, SearchClientInput } from './client.types';

@Injectable()
@Resolver()
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Query(() => Clients, { name: 'Clients' })
  async search(@Arg('data') data: SearchClientInput) {
    return await this.clientService.search(data);
  }
}
