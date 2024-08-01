import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class CommonProjectCode extends EnumType<CommonProjectCode>() {
  static readonly REGION_CODE = new CommonProjectCode('CO1001', 'REGION');

  private constructor(
    private readonly _code: string,
    private readonly _codeName: string,
  ) {
    super();
  }
  get code(): string {
    return this._code;
  }

  get codeName(): string {
    return this._codeName;
  }
}
