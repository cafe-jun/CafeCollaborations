import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import axios from 'axios';
import { JwtAccessTokenGuard } from '../auth/guard/access-token.guard';

@Controller()
export class AuthController {
  constructor() {}

  @Post('token')
  async getToken(@Body('code') code: string) {
    return;
  }
}
