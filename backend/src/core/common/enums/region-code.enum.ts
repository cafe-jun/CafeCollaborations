import { Enum, EnumType } from 'ts-jenum';
import { CommonProjectCode } from './project-code.enum';

@Enum('projectCode')
export class RegionCode extends EnumType<RegionCode>() {
  static readonly Seoul_CODE = new RegionCode('RE1000', 'Seoul', CommonProjectCode.REGION_CODE);
  static readonly Gyeonggi_CODE = new RegionCode('RE1002', 'Gyeonggi', CommonProjectCode.REGION_CODE);
  static readonly Gangwon_CODE = new RegionCode('RE1003', 'Gangwon', CommonProjectCode.REGION_CODE);
  static readonly Chungbuk_CODE = new RegionCode('RE1004', 'Chungbuk', CommonProjectCode.REGION_CODE);
  static readonly Chungnam_CODE = new RegionCode('RE1005', 'Chungnam', CommonProjectCode.REGION_CODE);
  static readonly jeonbuk_CODE = new RegionCode('RE1006', 'jeonbuk', CommonProjectCode.REGION_CODE);
  static readonly Jeonnam_CODE = new RegionCode('RE1007', 'Jeonnam', CommonProjectCode.REGION_CODE);
  static readonly Gyeongbuk_CODE = new RegionCode('RE1008', 'Gyeongbuk', CommonProjectCode.REGION_CODE);
  static readonly Jeju_CODE = new RegionCode('RE1009', 'Jeju', CommonProjectCode.REGION_CODE);

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
