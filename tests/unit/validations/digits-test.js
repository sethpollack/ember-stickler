import Ember from 'ember';
import digitsValidator  from '../../../validations/digits';
import { module, test } from 'qunit';

module('Unit | Validation | digits');

test('valid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const digits = digitsValidator.validate.bind(Context.create({}));
  const errors = [];

  assert.deepEqual(digits('123', []), errors);
});

test('inValid', function(assert) {
  assert.expect(5);

  const Context = Ember.Object.extend({});
  const digits = digitsValidator.validate.bind(Context.create({}));
  const errors = ['Please enter only digits.'];

  assert.deepEqual(digits('123.000', []), errors);
  assert.deepEqual(digits('123.000,00', []), errors);
  assert.deepEqual(digits('123.0.0,0', []), errors);
  assert.deepEqual(digits('x123', []), errors);
  assert.deepEqual(digits('100.100,0,0', []), errors);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const digits = digitsValidator.validate.bind(Context.create({digitsMessage: 'foo'}));

  assert.deepEqual(digits('100.100,0,0', []), ['foo']);
});
