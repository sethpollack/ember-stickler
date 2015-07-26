import Validation from 'ember-stickler/validation';

export default Validation.create({
  validate(value, errors) {
    if (!luhn(value)) {
      const message = this.getWithDefault('creditCardMessage', 'Please enter a valid credit card number.');

      errors.push(message);
    }

    return errors;
  }
});

function luhn(str) {
	return str.split('').reduceRight(function(prev, curr, idx){
		prev = parseInt(prev, 10);
		if ((idx + 1) % 2 !== 0) {
			curr = (curr * 2).toString().split('').reduce((p, c) => parseInt(p, 10) + parseInt(c, 10));
		}
		return prev + parseInt(curr, 10);
	}) % 10 === 0;
}
