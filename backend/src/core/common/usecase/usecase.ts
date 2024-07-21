export interface UseCase<TUsecasePort, TUseCaseResult> {
  execute(payload: TUsecasePort): Promise<TUseCaseResult>;
}
