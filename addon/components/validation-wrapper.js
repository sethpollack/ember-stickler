import Ember from 'ember';
import layout from '../templates/components/validation-wrapper';
import ValidationBase from '../mixins/validation-base';
import ValidatedArea from './validated-area';
import runValidations from '../utils/run-validations';

const {
  observer,
  on
  } = Ember;

export default ValidatedArea.extend(ValidationBase, {
  value: null,

  _isInitialized: false,
  _setValueInitialization: on('didInsertElement', function() {
    this.set('_isInitialized', true);
  }),

  _runValidations: observer('value', function() {
    if (this.get('_isInitialized')) {
      this.send('validate');
    }
  }),

  actions: {
    checkForValid() {
      const errors = runValidations(this);

      if (!errors.length) {
        this.setState({
          valid: true,
          errors: null
        });
      }
    },

    validate() {
      const errors = runValidations(this);

      if (errors.length) {
        this.setState({
          valid: false,
          errors: errors
        });
      } else {
        this.setState({
          valid: true,
          errors: null
        });
      }
    },

    reset() {
      this.setState({
        valid: null,
        errors: null
      });
    }
  }
});
