import Ember from 'ember';
import layout from './template';

const {
  A,
  computed,
  Component,
  } = Ember;

export default Component.extend({
  layout,

  tagName: 'form',
  attributeBindings: ['name', 'role', 'autocomplete', 'novalidate'],

  name: '',
  autocomplete: 'off',
  novalidate: 'novalidate',
  autocompleteWayOff: false,

  fields: null,
  role: null,
  submitErrors: null,
  action: 'submit',
  disableDuringSubmit: false,
  _promiseState: 'default',
  enableWhenDefault: false,

  submit(e) {
    e.preventDefault();

    this.send('submit');

    return false;
  },

  formState: computed('isValid', '_promiseState', function() {
    const state = this.get('_promiseState');
    const isValid = this.get('isValid');
    const disableDuringSubmit = this.get('disableDuringSubmit');
    const enableWhenDefault = this.get('enableWhenDefault');
    const isDefault = state === 'default';

    return {
      isDefault: state === 'default',
      isPending: state === 'pending',
      isResolved: state === 'resolved',
      isRejected: state === 'rejected',
      disabled: (enableWhenDefault && isDefault) ? false :
        !isValid || (disableDuringSubmit && state === 'pending'),
      text: state
    };
  }),

  isValid: computed('fields.@each.valid', function() {
    return this.get('fields')
      .every((field) => { return field.get('valid'); });
  }),

  actions: {
    register(params) {
      this.get('fields').pushObject(params);
    },

    submit() {

      this.get('fields').forEach(field => field.send('validate'));

      const reset = () => { this.send('reset'); };

      if(this.get('isValid')) {
        new Promise((resolve, reject) => {
          this.set('_promiseState', 'pending');
          this.sendAction('action', reset, resolve, reject);
        })
        .then(() => {
          this.set('submitErrors', null);
          this.set('_promiseState', 'resolved');
        })
        .catch((errors) => {
          this.set('submitErrors', errors);
          this.set('_promiseState', 'rejected');
        });
      }
    },

    reset() {
      this.get('fields').forEach(field => field.send('reset'));
      this.set('_promiseState', 'default');
    }
  },

  init() {
    this._super();
    this.set('fields', new A([]));
  }
});
