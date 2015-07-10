import Ember from 'ember';
import layout from '../templates/components/validated-input';
import ValidationBase from '../mixins/validation-base';

export default Ember.TextField.extend(ValidationBase, {
	layout: layout,
  focusOut() {
    this.send('validate');
  },
  keyUp() {
    this.send('checkForValid');
  }
});