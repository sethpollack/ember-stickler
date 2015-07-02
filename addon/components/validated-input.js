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
  },
  rules: {
    maxLength(self, value) {
      if (value.length > parseInt(self.get('maxLength'))) {
        return { message: self.get('maxLengthMessage')};
      }
    },
    minLength(self, value) {
      if (value.length < parseInt(self.get('minLength'))) {
        return { message: self.get('minLengthMessage')};
      }
    },
    email(self, value) {
      const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      let result = EMAIL_REGEX.test(value);
      if (!result) {
        return { message: self.get('email')};
      }
    }
  }
});