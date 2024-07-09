import { UserProvider } from '@core/common/enums/user-provider.enum';
import { Replace } from '@core/common/type/common.types';

export type UserProps = {
  name: string;
  email: string;
  provider: UserProvider;
  createdAt?: Date | null;
};

export class User {
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
