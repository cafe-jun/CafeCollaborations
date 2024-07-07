export interface UseCase<TUsecasePort, TUseCaseResult> {
  execute(usecasePort: TUsecasePort): Promise<TUseCaseResult>;
}
