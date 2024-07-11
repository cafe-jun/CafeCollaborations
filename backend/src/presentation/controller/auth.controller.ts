import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import axios from 'axios';
import { JwtAccessTokenGuard } from '../../application/auth/guard/access-token.guard';
import { AuthService } from '../../core/domain/auth/service/auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { OAuth2Client } from 'google-auth-library';
import { UserProvider } from '@core/common/enums/user-provider.enum';
@Controller('auth')
export class AuthController {
  // constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAccessTokenGuard)
  @ApiBody({})
  @ApiResponse({})
  @Post('token')
  async getToken(@Body('token') token: string, @Body('provider') provider: UserProvider) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    switch (provider) {
      case UserProvider.GOOGLE: {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const user = ticket.getPayload();
        return;
      }
      case UserProvider.KAKAO: {
        return;
      }
      case UserProvider.NAVER: {
        const user = await axios.get(process.env.NAVER_OAUTH_USER_API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return;
      }
    }
  }
}
