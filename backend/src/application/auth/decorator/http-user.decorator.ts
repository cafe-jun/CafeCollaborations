import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestsWIthUser } from '../type/http-auth.type';

export const HttpUser: () => any = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: RequestsWIthUser = ctx.switchToHttp().getRequest();
  return request.user;
});
