import Validation from 'ember-stickler/validation';
import moment from 'moment';

export default Validation.create({
  validate(value, errors) {
    const result = /Invalid|NaN/.test(new Date(value).toString());
    const valid = moment(value, 'YYYY-MM-DD').isValid();

    if (result || !valid) {
      const message = this.getWithDefault('dateMessage', 'Please enter a valid date.');

      errors.push(message);
    }

    return errors;
  }
});
