import { BaseEntity } from '@core/common/entity/base.entity';
import { UserProvider, UserRole } from '@core/common/enums/user.enum';
import { Replace } from '@core/common/type/common.types';
import { extend } from 'lodash';
import { CreateUserEntityPayload } from './type/create-user-entity.payload';
import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';

export class User extends BaseEntity<number> {
  @IsEmail()
  private email: string;

  @IsString()
  private name: string;

  @IsEnum(UserProvider)
  private provider: UserProvider;

  @IsEnum(UserRole)
  private role: UserRole;

  @IsDate()
  private readonly createdAt: Date;

  constructor(payload: CreateUserEntityPayload) {
    super();
    this.email = payload.email;
    this.name = payload.name;
    this.provider = payload.provider;
    this.role = payload.role || UserRole.GUEST;
    this.createdAt = payload.createdAt || new Date();
  }

  public getId(): number {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getEmail(): string {
    return this.email;
  }
  public getProvider(): UserProvider {
    return this.provider;
  }

  public getRole(): UserRole {
    return this.role;
  }

  public getCreatedAt(): Date | null {
    return this.createdAt;
  }
}
