import Ember from 'ember';

export function join([joiner, ...args]) {
  return (args || []).join(joiner);
}

export default Ember.Helper.helper(join);
