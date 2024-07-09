import { Optional } from '@core/common/type/common.types';
import { ValidationError } from 'class-validator';

export type ClassValidationDetails = {
  context: string;
  errors: ClassValidationErrors[];
};

export type ClassValidationErrors = {
  property: string;
  message: string[];
};

export class ClassValidator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static async validate(errors: ValidationError[]): Promise<Optional<ClassValidationDetails>> {
    let details: Optional<ClassValidationDetails>;

    if (errors.length > 0) {
      details = {
        context: errors.constructor.name,
        errors: [],
      };
      for (const error of errors) {
        details.errors.push({
          property: error.property,
          message: error.constraints ? Object.values(error.constraints) : [],
        });
      }
    }
    return details;
  }
}
