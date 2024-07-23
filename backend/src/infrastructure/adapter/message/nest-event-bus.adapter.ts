import { EventBusPort } from '@core/common/port/message/event-bus.port';
import { EventBus } from '@nestjs/cqrs';

export class NestEventBusAdapter implements EventBusPort {
  constructor(readonly eventBus: EventBus) {}
  public async sendEvent<TEvent extends object>(event: TEvent): Promise<void> {
    return this.eventBus.publish(event);
  }
}
