import { Enum, EnumType } from 'ts-jenum';
import { CommonProjectCode } from './project.enum';

@Enum('code')
export class RecruitMember extends EnumType<RecruitMember>() {
  static readonly Indefinite = new RecruitMember('RM1000', 'Indefinite', CommonProjectCode.RECRUIT_MEMBER);
  static readonly OneToFive = new RecruitMember('RM1002', 'OneToFive', CommonProjectCode.RECRUIT_MEMBER);
  static readonly SixToTen = new RecruitMember('RM1003', 'SixToTen', CommonProjectCode.RECRUIT_MEMBER);
  static readonly MoreThanTen = new RecruitMember('RM1004', 'MoreThanTen', CommonProjectCode.RECRUIT_MEMBER);

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
