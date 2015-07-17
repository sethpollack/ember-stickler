export default function runValidations(self) {
  const value = self.get('value');

  if (!self.get('isRequired') && !value) {
    return [];
  }

  const rules = self.get('selectedRules');

  let [_, errors] = rules.reduce((memo, rule) => rule.run(self, memo), [value, []]);
  return errors;
}
