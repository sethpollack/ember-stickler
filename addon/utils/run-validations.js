export default function runValidations(self) {
  const value = self.get('value');
  let errors = Ember.A();

  if (!self.get('isRequired') && !value) { //change to || and remove !
    return [];
  }

  const rules = self.get('selectedRules');

  rules.forEach(rule => rule(value, errors));
  return errors;
}
