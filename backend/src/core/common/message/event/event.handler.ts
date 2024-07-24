export interface EventHandler<TEvent> {
  handle(command: TEvent): Promise<void>;
}
