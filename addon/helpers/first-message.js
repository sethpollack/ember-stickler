import Ember from 'ember';

export function firstMessage([errors]) {
  return errors[0].message;
}

export default Ember.HTMLBars.makeBoundHelper(firstMessage);
