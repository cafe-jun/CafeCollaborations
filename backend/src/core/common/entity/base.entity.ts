import { Optional } from '../type/common.types';
import { ClassValidationDetails, ClassValidator } from '../util/class-validator/class-validator';

export class BaseEntity<TIdentifier extends string | number> {
  protected id: Optional<TIdentifier>;
  public getId(): TIdentifier {
    if (typeof this.id === 'undefined') {
      // TDOD : Exception Validate 필요
      return this.id;
    }
    return this.id;
  }

  public async validate(): Promise<void> {
    const detail: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
    if (detail) {
      // TODO : ERROR 필요
    }
  }
}
