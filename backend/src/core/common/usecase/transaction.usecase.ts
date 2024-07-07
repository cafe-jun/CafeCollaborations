import { UseCase } from './usecase';

export interface TranscationUseCase<TUseCasePort, TUseCaseResult> extends UseCase<TUseCasePort, TUseCaseResult> {
  onCommit?: (result: TUseCaseResult, port: TUseCasePort) => Promise<void>;
  onRollback?: (error: Error, port: TUseCasePort) => Promise<void>;
}
