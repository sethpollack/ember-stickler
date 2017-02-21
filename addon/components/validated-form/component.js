import Ember from 'ember';
import layout from './template';

const {
  A,
  computed,
  Component,
  RSVP
} = Ember;

export default Component.extend({
  layout,

  tagName: 'form',
  attributeBindings: ['name', 'role', 'autocomplete', 'novalidate'],

  name: '',
  autocomplete: 'off',
  novalidate: 'novalidate',
  autocompleteWayOff: false,

  fields: undefined,
  role:  undefined,
  submitErrors:  undefined,
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
    let fields = this.get('fields') || [];

    return fields
      .every((field) => {
        return field.get('valid');
      });
  }),

  actions: {

    register(params) {
      this.get('fields').pushObject(params);
    },

    forget(params) {
      this.get('fields').removeObject(params);
    },

    submit() {

      this.get('fields').forEach((field) => {
        return field.send('validate');
      });

      const reset = () => {
        this.send('reset');
      };

      if (this.get('isValid')) {
        new RSVP.Promise((resolve, reject) => {
          this.set('_promiseState', 'pending');
          this.sendAction('action', reset, resolve, reject);
        })
        .then(() => {
          this.set('submitErrors', undefined);
          this.set('_promiseState', 'resolved');
        })
        .catch((errors) => {
          this.set('submitErrors', errors);
          this.set('_promiseState', 'rejected');
        });
      } else {
        const a = this.get('fields').filterBy('valid', false);
        this.sendAction('onError', a);
      }
    },

    reset() {
      this.get('fields').forEach((field) => {
        field.send('reset');
      });
      this.set('_promiseState', 'default');
    }
  },

  init() {
    this._super(...arguments);
    this.set('fields', new A([]));
  }
});
