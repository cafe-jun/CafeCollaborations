import { AuthService } from '@core/domain/auth/service/auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ValidateTokenDto } from '@presentation/user/dto/request/validate-token.dto';
import { Response } from 'express';

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
