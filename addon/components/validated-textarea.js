import Ember from 'ember';
import layout from '../templates/components/validated-textarea';
import ValidationBase from '../mixins/validation-base';

export default Ember.TextArea.extend(ValidationBase, {
  layout: layout,

  focusOut() {
    this.send('validate');
  },

  keyUp() {
    this.send('checkForValid');
  }
});
