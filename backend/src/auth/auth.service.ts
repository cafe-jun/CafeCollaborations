import { UserService } from '@app/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser() {}
}
