import { EnumType } from 'ts-jenum';

export class CoreMessage extends EnumType<CoreMessage>() {
  public static readonly SUCCESS = new CoreMessage(200, 'Success');
  public static readonly BAD_REQUEST_ERROR = new CoreMessage(400, 'Bad Request');
  public static readonly INTERNAL_SERVER_ERROR = new CoreMessage(500, 'Internal Server Error ');

  private constructor(
    readonly _code: number,
    readonly _message: string,
  ) {
    super();
  }

  get code(): number {
    return this._code;
  }
  get message(): string {
    return this.message;
  }
}
