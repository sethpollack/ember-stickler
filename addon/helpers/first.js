import Ember from 'ember';

export function first([errors]) {
  return errors[0];
}

export default Ember.Helper.helper(first);
