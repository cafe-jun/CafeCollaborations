import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard } from '../guard/access-token.guard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HttpAuth = (): ((...args: any) => void) => {
  return applyDecorators(UseGuards(JwtAccessTokenGuard));
};
