import { Nullable } from '@core/common/type/common.types';
import { CoreMessage } from './message/core.message';

export class CoreApiResponse<TData> {
  public readonly code: number;
  public readonly message: string;
  public readonly timestamp: number;

  public readonly data: Nullable<TData>;
  private constructor(code: number, message: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data || null;
    this.timestamp = Date.now();
  }

  public static success<TData>(data?: TData, message?: string): CoreApiResponse<TData> {
    const resultCode: number = CoreMessage.SUCCESS.code;
    const resultMessage: string = message || CoreMessage.SUCCESS.message;
    return new CoreApiResponse(resultCode, resultMessage, data);
  }

  public static error<TData>(code?: number, message?: string, data?: TData): CoreApiResponse<TData> {
    const resultCode: number = code || CoreMessage.INTERNAL_SERVER_ERROR.code;
    const resultMessage: string = message || CoreMessage.INTERNAL_SERVER_ERROR.message;
    return new CoreApiResponse(resultCode, resultMessage, data);
  }
}
