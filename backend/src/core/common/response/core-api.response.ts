import { Nullable } from '../type/common.types';
import { CommonMsg } from './message/common-message';

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
    const resultCode: number = CommonMsg.SUCCESS.code;
    const resultMessage: string = message || CommonMsg.SUCCESS.message;
    return new CoreApiResponse(resultCode, resultMessage, data);
  }

  public static error<TData>(code?: number, message?: string, data?: TData): CoreApiResponse<TData> {
    const resultCode: number = code || CommonMsg.INTERNAL_SERVER_ERROR.code;
    const resultMessage: string = message || CommonMsg.INTERNAL_SERVER_ERROR.message;
    return new CoreApiResponse(resultCode, resultMessage, data);
  }
}
