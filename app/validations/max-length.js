import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    const length = this.get('maxLength');

    if (!value || value.length > parseInt(length)) {
      const message = this.getWithDefault('maxLengthMessage', `Please enter no more than ${length} characters.`);

      errors.push(message);
    }

    return errors;
  }
});
