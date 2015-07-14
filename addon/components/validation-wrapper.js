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
  layout: layout,

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

  setState: function(params) {
    this.setProperties(params);
  },

  actions: {
    change(v) {
      this.set('value', v);
    },

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
