import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const result = EMAIL_REGEX.test(value);

    if (!result) {
      const message = this.getWithDefault('emailMessage', 'A valid email address is required');
      
      errors.push(message);
    }

    return errors;
  }
});