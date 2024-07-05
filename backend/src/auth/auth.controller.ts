import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import axios from 'axios';

@Controller()
export class AuthController {
  constructor() {}
  @Post('token')
  async getToken(@Body('code') code: string) {
    return;
  }
}
