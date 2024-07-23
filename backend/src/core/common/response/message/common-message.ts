import { Enum, EnumType } from 'ts-jenum';
import { CodeDescription } from '../../exception/exception';

export interface CoreMsg {
  code: number;
  message: string;
}

@Enum('message')
export class CommonMsg extends EnumType<CommonMsg>() implements CoreMsg {
  static readonly SUCCESS = new CommonMsg(200, 'Success');
  static readonly BAD_REQUEST_ERROR = new CommonMsg(400, 'Bad Request');
  static readonly INTERNAL_SERVER_ERROR = new CommonMsg(500, 'Internal Server Error ');
  static readonly UNAUTHORIZED_ERROR = new CommonMsg(401, 'Unauthorized error.');
  static readonly WRONG_CREDENTIALS_ERROR = new CommonMsg(402, 'Wrong Credentials.');
  static readonly ACCESS_DENIED_ERROR = new CommonMsg(403, 'Access denied.');
  static readonly ARGUMENT_INVALID = new CommonMsg(4001, '잘못된 파라미터 입니다.');
  static readonly MANDATORY_ARGUMENT_IS_NULL = new CommonMsg(4002, '필수 파라미터가 없습니다.');
  static readonly ENTITY_NOT_FOUND_ERROR = new CommonMsg(1000, 'Entity not found.');
  static readonly ENTITY_VALIDATION_ERROR = new CommonMsg(1001, 'Entity validation error.');
  static readonly USE_CASE_PORT_VALIDATION_ERROR = new CommonMsg(1002, 'Use-case port validation error.');
  static readonly VALUE_OBJECT_VALIDATION_ERROR = new CommonMsg(1003, 'Value object validation error.');
  static readonly ENTITY_ALREADY_EXISTS_ERROR = new CommonMsg(1004, 'Entity already exists.');

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
    return this._message;
  }

  getDescription(): CodeDescription {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
