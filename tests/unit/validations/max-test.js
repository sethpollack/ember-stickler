import Ember from 'ember';
import maxValidator  from '../../../validations/max';
import { module, test } from 'qunit';

module('Unit | Validation | max');

test('valid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const max = maxValidator.validate.bind(Context.create({ max: 2 }));

  assert.deepEqual(max('1', []), []);
});

test('inValid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const max = maxValidator.validate.bind(Context.create({ max: 2 }));

  assert.deepEqual(max('5', []), ['Please enter a value less than or equal to 2']);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const max = maxValidator.validate.bind(Context.create({ max: 2, maxMessage: 'foobar' }));

  assert.deepEqual(max('123', []), ['foobar']);
});
