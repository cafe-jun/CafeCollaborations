import { QueryBusPort } from '@core/common/port/message/query-bus.port';
import { QueryBus } from '@nestjs/cqrs';

export class NestQueryBusAdapter implements QueryBusPort {
  constructor(readonly queryBus: QueryBus) {}
  public async sendQuery<TQuery extends object, TQueryResult>(query: TQuery): Promise<TQueryResult> {
    return this.queryBus.execute(query);
  }
}
