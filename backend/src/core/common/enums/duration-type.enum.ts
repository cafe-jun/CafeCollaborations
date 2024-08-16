import { Enum, EnumType } from 'ts-jenum';
import { CommonProjectCode } from './project.enum';

@Enum('code')
export class Duration extends EnumType<Duration>() {
  static readonly LessThanOneMonth = new Duration('DU1000', 'LessThanOneMonth', CommonProjectCode.DURATION_TYPE);
  static readonly OneToThreeMonths = new Duration('DU1002', 'OneToThreeMonths', CommonProjectCode.DURATION_TYPE);
  static readonly ThreeToSixMonths = new Duration('DU1003', 'ThreeToSixMonths', CommonProjectCode.DURATION_TYPE);
  static readonly MoreThanSixMonths = new Duration('DU1004', 'MoreThanSixMonths', CommonProjectCode.DURATION_TYPE);

  private constructor(
    private readonly _code: string,
    private readonly _codeName: string,
    private readonly _projectCode: CommonProjectCode,
  ) {
    super();
  }
  get code(): string {
    return this._code;
  }

  get codeName(): string {
    return this._codeName;
  }
  get projectCode(): CommonProjectCode {
    return this._projectCode;
  }
  static getValues() {
    return this.values().map((code) => code.code);
  }

  static getByCode(code: string): Duration {
    return this.values().find((c) => c.code === code);
  }
}
