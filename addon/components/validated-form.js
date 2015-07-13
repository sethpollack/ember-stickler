import Ember from 'ember';
import layout from '../templates/components/validated-form';

export default Ember.Component.extend({
  layout: layout,

  tagName: 'form',
  attributeBindings: ['role'],
  fields: null,
  role: null,

  submit(e) {
    e.preventDefault();
    this.get('fields').forEach(field => field.send('validate'));

    var _this = this;
    function callbackHandler(promise) {
      set(_this, 'promise', promise);
      promise.then(
        _this._submitResolve.bind(_this),
        _this._submitReject.bind(_this)
      );
    }

    if(this.get('valid')) {
      this.sendAction('action', callbackHandler);
    }

  },

  submitErrors: null,
  _submitResolve: function() {},
  _submitReject: function(errors) {
    this.set('submitErrors', errors)
  },

  valid: Ember.computed('fields.@each.isValid', function() {
    return this.get('fields').every(field => field.get('isValid'));
  }),

  actions: {
    register(params) {
      this.get('fields').push(params);
    },

    resetFields() {
      this.get('fields').forEach(field => field.send('reset'));
    }
  },

  init: function() {
    this._super();

    this.set('fields', Ember.A());
  }
});
