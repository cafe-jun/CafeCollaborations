import { UnauthorizedException } from '@nestjs/common';
import { AuthExceptionMsg } from './auth.message';

export class TokenExpiredException extends UnauthorizedException {
  constructor() {
    super(AuthExceptionMsg.TOKEN_EXPIRED);
  }
}

export class UnAuthorizedAccessException extends UnauthorizedException {
  constructor() {
    super(AuthExceptionMsg.UNAUTHORIZED);
  }
}

export class UserIncorrectEmailException extends UnauthorizedException {
  constructor() {
    super(AuthExceptionMsg.LOGIN_INPUT_INVALID_EMAIL);
  }
}

export class UserIncorrectPasswordException extends UnauthorizedException {
  constructor() {
    super(AuthExceptionMsg.LOGIN_INPUT_INVALID_PASSWORD);
  }
}
