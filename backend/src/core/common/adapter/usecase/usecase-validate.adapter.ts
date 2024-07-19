import { Exception } from '@core/common/exception/Exception';
import { CommonMsg } from '@core/common/response/message/common-message';
import { Optional } from '@core/common/type/common.types';
import { ClassValidationDetails, ClassValidator } from '@core/common/util/class-validator/class-validator';

export class UseCaseValidateAdapter {
  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
    if (details) {
      throw Exception.create({ code: CommonMsg.USE_CASE_PORT_VALIDATION_ERROR.getDescription(), data: details });
    }
  }
}
