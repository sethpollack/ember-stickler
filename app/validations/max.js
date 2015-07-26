import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    const max = this.get('max');

    if (!value || parseInt(value) > max) {
      const message = this.getWithDefault('maxMessage', `Please enter a value less than or equal to ${max}`);

      errors.push(message);
    }

    return errors;
  }
});
