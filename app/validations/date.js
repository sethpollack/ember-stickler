import Validation from 'ember-stickler/validation';
import moment from 'moment';

export default Validation.create({
  validate(value, errors) {
    const result = moment(value, 'MM-DD-YYYY').isValid();
    console.log(result, value);
    if (result) {
      const message = this.getWithDefault('dateMessage', 'Please enter a valid date.');

      errors.push(message);
    }

    return errors;
  }
});
