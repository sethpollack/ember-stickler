import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    const DIGITS_REGEX = /^\d+$/;
    const result = DIGITS_REGEX.test(value);

    if (!result) {
      const message = this.getWithDefault('digitsMessage', 'Please enter only digits.');

      errors.push(message);
    }

    return errors;
  }
});
