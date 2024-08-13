import { Exception } from '@core/common/exception/exception';
import { CoreApiResponse } from '@core/common/response/core-api.response';
import { CommonMsg } from '@core/common/response/message/common-message';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class NestRestExceptionFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const request = host.switchToHttp().getRequest() as Request;
    const response = host.switchToHttp().getResponse() as Response;

    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error(CommonMsg.INTERNAL_SERVER_ERROR.code, error.message);
    errorResponse = this.handelNestError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);
    const message: string = `Method: ${request.method}; ` + `Path: ${request.path}; ` + `Error: ${errorResponse.message}`;
    Logger.error(message);
    response.json(errorResponse);
  }

  private handelNestError(error: Error, errorResponse: CoreApiResponse<unknown>): CoreApiResponse<unknown> {
    if (error instanceof HttpException) {
      errorResponse = CoreApiResponse.error(error.getStatus(), error.message, null);
      return errorResponse;
    }
    if (error instanceof UnauthorizedException) {
      errorResponse = CoreApiResponse.error(CommonMsg.UNAUTHORIZED_ERROR.code, error.message, null);
      return errorResponse;
    }
    return errorResponse;
  }
  private handleCoreException(error: Error, errorResponse: CoreApiResponse<unknown>): CoreApiResponse<unknown> {
    if (error instanceof Exception) {
      errorResponse = CoreApiResponse.error(error.code, error.message, error.data);
    }

    return errorResponse;
  }
}
