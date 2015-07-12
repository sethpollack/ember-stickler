import Ember from 'ember';
import layout from '../templates/components/validated-area';

export default Ember.Component.extend({
  layout: layout,

  targetObject: Ember.computed.alias('parentView'),

  errors: null,
  valid: null,

  actions: {
    validate(params) {
      this.set('errors', params.errors);
      this.set('valid', params.valid);
    },

    register(params) {
      this.sendAction('register', params);
    }
  }
});
