import { Nullable } from '../type/common.types';
import { CommonMsg } from './message/common-message';

export class CoreApiResponse<TData, TMeta = any> {
  public readonly code: number;

  public readonly message: string;

  public readonly timestamp: number;

  public readonly data: Nullable<TData>;

  public readonly meta: Nullable<TMeta>;

  private constructor(code: number, message: string, data?: TData, meta?: TMeta) {
    this.code = code;
    this.message = message;
    this.data = data || null;
    this.meta = meta || null;
    this.timestamp = Date.now();
  }

  public static success<TData, TMeta>(data?: TData, message?: string, meta?: TMeta): CoreApiResponse<TData, TMeta> {
    const resultCode: number = CommonMsg.SUCCESS.code;
    const resultMessage: string = message || CommonMsg.SUCCESS.message;
    return new CoreApiResponse(resultCode, resultMessage, data, meta);
  }

  public static error<TData>(code?: number, message?: string, data?: TData): CoreApiResponse<TData> {
    const resultCode: number = code || CommonMsg.INTERNAL_SERVER_ERROR.code;
    const resultMessage: string = message || CommonMsg.INTERNAL_SERVER_ERROR.message;
    return new CoreApiResponse(resultCode, resultMessage, data);
  }
}
