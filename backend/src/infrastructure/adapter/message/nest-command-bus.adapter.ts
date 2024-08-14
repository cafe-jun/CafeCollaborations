import { CommandBusPort } from '@core/common/port/message/command-bus.port';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

// TODO 이부분이 없으면 excute 메소드에서 에러 발생
// 왜 그런지 파악
@Injectable()
export class NestCommandBusAdapter implements CommandBusPort {
  constructor(readonly commandBus: CommandBus) {}
  public async sendCommand<TCommand extends object>(command: TCommand): Promise<void> {
    return this.commandBus.execute(command);
  }
}
