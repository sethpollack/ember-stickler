import Ember from 'ember';
import creditCardValidator  from '../../../validations/credit-card';
import { module, test } from 'qunit';

module('Unit | Validation | creditCard');

test('valid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const creditCard = creditCardValidator.validate.bind(Context.create({}));
  const errors = [];

  assert.deepEqual(creditCard('4111111111111111', []), errors);
});

test('inValid', function(assert) {
  assert.expect(4);

  const Context = Ember.Object.extend({});
  const creditCard = creditCardValidator.validate.bind(Context.create({}));
  const errors = ['Please enter a valid credit card number.'];

  assert.deepEqual(creditCard('41111', []), errors);
  assert.deepEqual(creditCard('asdf', []), errors);
  assert.deepEqual(creditCard('4111-1111-1111-1111', []), errors);
  assert.deepEqual(creditCard('4111 1111 1111 1111', []), errors);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const creditCard = creditCardValidator.validate.bind(Context.create({creditCardMessage: 'foo'}));

  assert.deepEqual(creditCard('foo', []), ['foo']);
});
