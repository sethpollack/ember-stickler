import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    const length = this.get('minLength');

    if (!value || value.length < parseInt(length)) {
      const message = this.getWithDefault('minLengthMessage', `Please enter at least ${length} characters.`);

      errors.push(message);
    }

    return errors;
  }
});
