import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { UserProvider, UserRole } from '@core/common/enums/user.enum';
import { CreateUserPort } from '@core/domain/user/port/usecase/user.port';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { IsEmail, IsEnum, IsString } from 'class-validator';

@Exclude()
export class CreateUserAdapter extends UseCaseValidateAdapter implements CreateUserPort {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEnum(UserProvider)
  provider: UserProvider;

  @Expose()
  @IsEnum(UserRole)
  role?: UserRole;

  public static async create(payload: CreateUserPort): Promise<CreateUserAdapter> {
    const adapter: CreateUserAdapter = plainToInstance(CreateUserAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
