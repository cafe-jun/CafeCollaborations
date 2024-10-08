import { Optional } from '../type/common.types';

export type CodeDescription = {
  code: number;
  message: string;
};

export type CreateExceptionPayload<TData> = {
  code: CodeDescription;
  overrideMessage?: string;
  data?: TData;
};

export class Exception<TData> extends Error {
  public readonly code: number;
  public readonly data: Optional<TData>;
  private constructor(codeDescription: CodeDescription, overrideMessage?: string, data?: TData) {
    super();

    this.name = this.constructor.name;
    this.code = codeDescription.code;
    this.data = data;
    this.message = overrideMessage || codeDescription.message;

    Error.captureStackTrace(this, this.constructor);
  }

  public static create<TData>(payload: CreateExceptionPayload<TData>): Exception<TData> {
    return new Exception(payload.code, payload.overrideMessage, payload.data);
  }
}
