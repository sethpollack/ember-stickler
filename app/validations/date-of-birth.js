import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    const minAge = this.get('minAge'),
      maxAge = this.get('maxAge');
    
    let message = null;

    if (age(value) < minAge) {
      message = this.getWithDefault('minAgeMessage', `You must be ${minAge} or older`);

      errors.push(message);
    }

    if (age(value) > maxAge) {
      message = this.getWithDefault('maxAgeMessage', `You must be younger than ${maxAge}`);

      errors.push(message);
    }

    return errors;
  }
});

function age(str) {
  let today = new Date(),
  dob = new Date(str),
  age = (today.setHours(0,0,0,0) - dob) / 31556952000;

  return age;
}
