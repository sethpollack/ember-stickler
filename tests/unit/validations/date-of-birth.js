import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    const result = /Invalid|NaN/.test(new Date(value).toString());
    const minAge = this.get('minAge');
    if (result || age(value) < minAge) {
      const message = this.getWithDefault('dateMessage', `You must be ${minAge} or older to order`);

      errors.push(message);
    }

    return errors;
  }
});

function age(str) {
  var today = new Date(),
  dob = new Date(str),
  age = (today.setHours(0,0,0,0) - dob) / 31556952000;

  return age;
}
