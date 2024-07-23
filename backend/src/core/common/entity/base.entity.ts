import { Exception } from '../exception/exception';
import { CommonMsg } from '../response/message/common-message';
import { Optional } from '../type/common.types';
import { ClassValidationDetails, ClassValidator } from '../util/class-validator/class-validator';

export class BaseEntity<TIdentifier extends string | number> {
  protected id: Optional<TIdentifier>;

  public getId(): TIdentifier {
    if (typeof this.id === 'undefined') {
      throw Exception.create({
        code: CommonMsg.ENTITY_VALIDATION_ERROR.getDescription(),
        overrideMessage: `${this.constructor.name}: ID is empty.`,
      });
    }
    return this.id;
  }

  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
    if (details) {
      throw Exception.create({
        code: CommonMsg.ENTITY_VALIDATION_ERROR.getDescription(),
        data: details,
      });
    }
  }
}
