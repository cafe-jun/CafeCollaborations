import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppHeaderProvider implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessCredentials = 'Access-Control-Allow-Credentials';
    const accessOrigin = 'Access-Control-Allow-Origin';
    const accessMethods = 'Access-Control-Allow-Methods';
    const accessHeaders = 'Access-Control-Allow-Headers';
    res.setHeader(accessCredentials, 'true');
    res.setHeader(accessOrigin, req.headers.origin || 'http://localhost:3000');
    res.setHeader(accessMethods, 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader(accessHeaders, 'Content-Type, Authorization');
    next();
  }
}
