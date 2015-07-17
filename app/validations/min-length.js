import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    const length = this.get('minLengthValue');

    if (!value || value.length < parseInt(length)) {
      const message = this.getWithDefault('minLengthMessage', `Min length of ${length} allowed`);

      errors.push(message);
    }

    return errors;
  }
});
