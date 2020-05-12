import _ from 'lodash'

import validations from './validate';

export const validateRequest = (validate, args) => {
    if(_.has(validations, validate)) {
        const validateSchema = _.get(validations, validate);
        const err = validateSchema.validate(args);
        if (!err.error) {
            return {success: true}
        } else {
            const allErrors = [];
            err.error.details.forEach((errors) => {
                const findError = allErrors.filter(error => error === errors.context.label);
                if (findError.length === 0) {
                  allErrors.push(errors.context.label);
                }
              });
            return {success: false, error: allErrors}
        }
    }
}