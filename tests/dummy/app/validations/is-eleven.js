import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    if (value !== '11') {
      errors.push('Take it to eleven!');
    }

    return errors;
  }
});
