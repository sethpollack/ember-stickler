import Ember from 'ember';

export default Ember.Object.extend({
  run(self, [value, errors]) {
    let newValue = this.transform.call(self, value);
    return [newValue, errors];
  }
});