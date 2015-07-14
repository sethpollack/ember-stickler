export default function runValidations(self) {
  const value = self.get('value');
  let errors = [];

  if (!self.get('isRequired') && !value) {
    return [];
  }

  const rules = self.get('selectedRules');

  rules.forEach(rule => rule(value, errors));
  return errors;
}
