import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class CommonProjectCode extends EnumType<CommonProjectCode>() {
  static readonly REGION = new CommonProjectCode('CO1001', 'REGION');
  static readonly CATEGORY = new CommonProjectCode('CO1002', 'CATEGORY');
  static readonly RECRUIT_MEMBER = new CommonProjectCode('CO1003', 'RECRUIT_MEMBER');
  static readonly DURATION_TYPE = new CommonProjectCode('CO1004', 'DURATION_TYPE');

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

  static getValues() {
    return this.values().map((code) => code.code);
  }

  static getAllProjectCode() {
    return this.values().map((code) => {
      return {
        code: code.code,
        codeName: code.codeName,
      };
    });
  }
}
