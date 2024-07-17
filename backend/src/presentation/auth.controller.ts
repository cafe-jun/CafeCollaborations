import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../core/domain/auth/service/auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ValidateTokenDto } from './dto/user/request/validate-token.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBody({})
  @ApiResponse({})
  @Post('token')
  async validateOauthToken(@Res({ passthrough: true }) res: Response, @Body() dto: ValidateTokenDto) {
    const result = await this.authService.ssoLogin(dto.token, dto.provider);
    return result;
  }
}
