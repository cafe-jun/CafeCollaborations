import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import axios from 'axios';
import { JwtAccessTokenGuard } from '../../application/auth/guard/access-token.guard';
import { AuthService } from '../../core/domain/auth/service/auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { OAuth2Client } from 'google-auth-library';
import { UserProvider } from '@core/common/enums/user-provider.enum';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBody({})
  @ApiResponse({})
  @Post('token')
  async validateOauthToken(@Res({ passthrough: true }) res: Response, @Body('token') token: string, @Body('provider') provider: UserProvider) {
    const result = await this.authService.ssoLogin(token, provider);
    return result;
  }
}
