import Ember from 'ember';

export function forBool([value, trueClass, falseClass, initialClass]) {
  if (value === null) {
    return initialClass || '';
  }

  return value ? trueClass : falseClass;
}

export default Ember.Helper.helper(forBool);
