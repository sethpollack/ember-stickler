import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    const min = this.get('min');

    if (!value || parseInt(value) <  min) {
      const message = this.getWithDefault('minMessage', `Please enter a value greater than or equal to ${min}`);

      errors.push(message);
    }

    return errors;
  }
});
