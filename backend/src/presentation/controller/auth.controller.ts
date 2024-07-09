import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import axios from 'axios';
import { JwtAccessTokenGuard } from '../../application/auth/guard/access-token.guard';
import { AuthService } from '../../core/domain/auth/service/auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBody({})
  @ApiResponse({})
  @Post('token')
  async getToken(@Body('code') code: string) {
    return;
  }
}
