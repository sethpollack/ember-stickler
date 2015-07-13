import Ember from 'ember';

export function classState([value, trueClass, falseClass, initialClass]) {
  if(value === null) {
    return initialClass || '';
  }

  return value ? trueClass : falseClass;
}

export default Ember.HTMLBars.makeBoundHelper(classState);
