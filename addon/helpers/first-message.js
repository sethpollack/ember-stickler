import Ember from 'ember';

export function firstMessage([errors]) {
  return errors[0];
}

export default Ember.HTMLBars.makeBoundHelper(firstMessage);
