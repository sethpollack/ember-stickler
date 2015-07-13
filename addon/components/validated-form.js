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

    if(this.get('valid')) {
      this.sendAction('action', this);
    }
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
