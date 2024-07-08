import { UserProvider } from '@core/common/enums/user-provider.enum';
import { Replace } from '@core/common/type/common.types';

export type UserProps = {
  name: string;
  email: string;
  provider: UserProvider;
  createdAt: Date | null;
};

export class User {
  private props: UserProps;
  private _id;
  constructor(props: Replace<UserProps, { createdAt: Date }>, id?: number) {
    this._id = id;
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  public getId(): number {
    return this._id;
  }
  public getName(): string {
    return this.props.name;
  }
  public getEmail(): string {
    return this.props.email;
  }
  public getProvider(): UserProvider {
    return this.props.provider;
  }
  public getCreatedAt(): Date {
    return this.props.createdAt;
  }
}
