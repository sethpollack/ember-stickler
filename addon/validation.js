import Ember from 'ember';

export default Ember.Object.extend({
  run(self, [value, errors]) {
    let newErrors = this.validate.call(self, value, errors);
    return [value, newErrors];
  }
});