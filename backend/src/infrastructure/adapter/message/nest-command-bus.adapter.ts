import { CommandBusPort } from '@core/common/port/message/command-bus.port';
import { CommandBus } from '@nestjs/cqrs';

export class NestCommandBusAdapter implements CommandBusPort {
  constructor(readonly commandBus: CommandBus) {}
  public async sendCommand<TCommand extends object>(command: TCommand): Promise<void> {
    return this.commandBus.execute(command);
  }
}
