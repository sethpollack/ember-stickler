import Ember from 'ember';
import layout from '../templates/components/validated-area';

export default Ember.Component.extend({
  layout: layout,

  errors: null,
  valid: null,

  actions: {
    setState(params) {
      this.set('errors', params.errors);
      this.set('valid', params.valid);
    }
  }
});
