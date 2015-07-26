import Ember from 'ember';
import numberValidator  from '../../../validations/number';
import { module, test } from 'qunit';

module('Unit | Validation | number');

test('valid', function(assert) {
  assert.expect(15);

  const Context = Ember.Object.extend({});
  const number = numberValidator.validate.bind(Context.create({}));
  const errors = [];

  assert.deepEqual(number('123', []), errors);
  assert.deepEqual(number('-123', []), errors);
  assert.deepEqual(number('123,000', []), errors);
  assert.deepEqual(number('-123,000', []), errors);
  assert.deepEqual(number('123,000.00', []), errors);
  assert.deepEqual(number('-123,000.00', []), errors);

  assert.deepEqual(number('', []), errors);
  assert.deepEqual(number('123', []), errors);
  assert.deepEqual(number('123000', []), errors);
  assert.deepEqual(number('123000.12', []), errors);
  assert.deepEqual(number('-123000.12', []), errors);
  assert.deepEqual(number('123.000', []), errors);
  assert.deepEqual(number('123,000.00', []), errors);
  assert.deepEqual(number('-123,000.00', []), errors);
  assert.deepEqual(number('.100', []), errors);
});

test('inValid', function(assert) {
  assert.expect(9);

  const Context = Ember.Object.extend({});
  const number = numberValidator.validate.bind(Context.create({}));
  const errors = ['Please enter a valid number.'];

  assert.deepEqual(number('-', []), errors);
  assert.deepEqual(number('123.000,00', []), errors);
  assert.deepEqual(number('123.0.0,0', []), errors);
  assert.deepEqual(number('x123', []), errors);
  assert.deepEqual(number('100.100,0,0', []), errors);

  assert.deepEqual(number('1230,000.00', []), errors);
  assert.deepEqual(number('123.0.0,0', []), errors);
  assert.deepEqual(number('x123', []), errors);
  assert.deepEqual(number('100.100,0,0', []), errors);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const number = numberValidator.validate.bind(Context.create({numberMessage: 'foo'}));

  assert.deepEqual(number('100.100,0,0', []), ['foo']);
});
