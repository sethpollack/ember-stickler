import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    const DATEISO_REGEX = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    const result = DATEISO_REGEX.test(value);

    if (!result) {
      const message = this.getWithDefault('dateISOMessage', 'Please enter a valid date.');

      errors.push(message);
    }

    return errors;
  }
});
