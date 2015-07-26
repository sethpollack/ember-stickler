import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    const REGEX = this.get('format');
    const result = REGEX.test(value);

    if (!result) {
      const message = this.getWithDefault('formatMessage', `A valid format matching ${REGEX} is required`);

      errors.push(message);
    }

    return errors;
  }
});
