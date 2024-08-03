import { Enum, EnumType } from 'ts-jenum';
import { CommonProjectCode } from './project.enum';

@Enum('code')
export class Category extends EnumType<Category>() {
  static readonly ACCOMMODATION_CODE = new Category('CA1000', 'Accommodation', CommonProjectCode.CATEGORY);
  static readonly FOOD_CODE = new Category('CA1001', 'Food', CommonProjectCode.CATEGORY);
  static readonly FASHION_CODE = new Category('CA1002', 'Fashion', CommonProjectCode.CATEGORY);
  static readonly BEAUTY_CODE = new Category('CA1003', 'Beauty', CommonProjectCode.CATEGORY);
  static readonly APP_CODE = new Category('CA1004', 'App', CommonProjectCode.CATEGORY);
  static readonly HOUSEHOLD_GOODS_CODE = new Category('CA1005', 'HouseholdGoods', CommonProjectCode.CATEGORY);
  static readonly PET_SUPPLIES_CODE = new Category('CA1006', 'PetSupplies', CommonProjectCode.CATEGORY);

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

  static getByCode(code: string): Category {
    return this.values().find((c) => c.code === code);
  }

  static getValues() {
    return this.values().map((code) => code.code);
  }
}
