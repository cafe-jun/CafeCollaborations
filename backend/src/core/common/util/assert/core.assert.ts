import { Nullable, Optional } from '@core/common/type/common.types';
import _ from 'lodash';
export class CoreAssert {
  public static isTrue(expression: boolean, exception: Error): void {
    if (!expression) {
      throw exception;
    }
  }

  public static isFalse(expression: boolean, exception: Error): void {
    if (expression) {
      throw exception;
    }
  }
  public static isEmpty<T>(value: Optional<Nullable<T>>, exception: Error): T {
    if (_.isEmpty(value)) {
      throw exception;
    }
    return value;
  }
  public static notEmpty<T>(value: Optional<Nullable<T>>, exception: Error): T {
    if (value === null || value === undefined) {
      throw exception;
    }
    return value;
  }
  public static isEqual<T>(value: Optional<Nullable<T>>, compareValue: Optional<Nullable<T>>, exception: Error): T {
    if (_.isEqual(value, compareValue)) {
      throw exception;
    }
    return value;
  }
}
