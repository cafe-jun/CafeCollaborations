import { Enum, EnumType } from 'ts-jenum';
import { CommonProjectCode } from './project.enum';

@Enum('code')
export class DurationTypeCode extends EnumType<DurationTypeCode>() {
  static readonly LessThanOneMonth = new DurationTypeCode('DU1000', 'LessThanOneMonth', CommonProjectCode.DURATION_TYPE);
  static readonly OneToThreeMonths = new DurationTypeCode('DU1002', 'OneToThreeMonths', CommonProjectCode.DURATION_TYPE);
  static readonly ThreeToSixMonths = new DurationTypeCode('DU1003', 'ThreeToSixMonths', CommonProjectCode.DURATION_TYPE);
  static readonly MoreThanSixMonths = new DurationTypeCode('DU1004', 'MoreThanSixMonths', CommonProjectCode.DURATION_TYPE);

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
}
