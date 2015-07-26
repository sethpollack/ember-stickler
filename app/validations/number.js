import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    const NUMBER_REGEX = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
    const result = NUMBER_REGEX.test(value);

    if (!result) {
      const message = this.getWithDefault('numberMessage', 'Please enter a valid number.');

      errors.push(message);
    }

    return errors;
  }
});
