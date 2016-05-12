import Ember from 'ember';
import minValidator  from '../../../validations/min';
import { module, test } from 'qunit';

module('Unit | Validation | min');

test('valid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const min = minValidator.validate.bind(Context.create({ min: 2 }));

  assert.deepEqual(min('123', []), []);
});

test('inValid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const min = minValidator.validate.bind(Context.create({ min: 2 }));

  assert.deepEqual(min('1', []), ['Please enter a value greater than or equal to 2']);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const min = minValidator.validate.bind(Context.create({ min: 2, minMessage: 'foobar' }));

  assert.deepEqual(min('1', []), ['foobar']);
});
