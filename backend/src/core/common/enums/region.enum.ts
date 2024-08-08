import { Enum, EnumType } from 'ts-jenum';
import { CommonProjectCode } from './project.enum';

@Enum('code')
export class Region extends EnumType<Region>() {
  static readonly Seoul = new Region('RE1000', 'Seoul', CommonProjectCode.REGION);
  static readonly Gyeonggi = new Region('RE1002', 'Gyeonggi', CommonProjectCode.REGION);
  static readonly Gangwon = new Region('RE1003', 'Gangwon', CommonProjectCode.REGION);
  static readonly Chungbuk = new Region('RE1004', 'Chungbuk', CommonProjectCode.REGION);
  static readonly Chungnam = new Region('RE1005', 'Chungnam', CommonProjectCode.REGION);
  static readonly jeonbuk = new Region('RE1006', 'jeonbuk', CommonProjectCode.REGION);
  static readonly Jeonnam = new Region('RE1007', 'Jeonnam', CommonProjectCode.REGION);
  static readonly Gyeongbuk = new Region('RE1008', 'Gyeongbuk', CommonProjectCode.REGION);
  static readonly Jeju = new Region('RE1009', 'Jeju', CommonProjectCode.REGION);

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
