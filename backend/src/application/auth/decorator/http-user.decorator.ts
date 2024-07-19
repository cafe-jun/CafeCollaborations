import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpRequestsWIthUser } from '../type/http-auth.type';

export const HttpUser: () => any = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: HttpRequestsWIthUser = ctx.switchToHttp().getRequest();
  return request.user;
});
