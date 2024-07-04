import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import axios from 'axios';

@Controller()
export class AuthController {
  constructor(private readonly httpService: HttpService) {}
  @Post('oauth2/code')
  async getAuthrizationToken(@Body('code') code: string) {
    return;
  }
}
