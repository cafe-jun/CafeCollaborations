import { BaseEntity } from '@core/common/entity/base.entity';
import { UserProvider, UserRole } from '@core/common/enums/user.enum';
import { Replace } from '@core/common/type/common.types';
import { extend } from 'lodash';

export type UserProps = {
  name: string;
  email: string;
  provider: UserProvider;
  role: UserRole;
  createdAt?: Date | null;
};

export class User extends BaseEntity<number> {
  private _props: UserProps;
  private _id: number;
  constructor(props: Replace<UserProps, { createdAt?: Date | null }>, id?: number) {
    this._id = id;
    this._props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  public getId(): number {
    return this._id;
  }
  public getName(): string {
    return this._props.name;
  }
  public getEmail(): string {
    return this._props.email;
  }
  public getProvider(): UserProvider {
    return this._props.provider;
  }
  public getCreatedAt(): Date | null {
    return this._props.createdAt;
  }
}
