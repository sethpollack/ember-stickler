import Ember from 'ember';
import existsValidator  from '../../../validations/exists';
import { module, test } from 'qunit';

module('Unit | Validation | exists');

test('valid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const exists = existsValidator.validate.bind(Context.create({}));

  assert.deepEqual(exists('foo', []), []);
});

test('inValid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const exists = existsValidator.validate.bind(Context.create({}));

  assert.deepEqual(exists('', []), ['This field is required']);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const exists = existsValidator.validate.bind(Context.create({ existsMessage: 'foobar' }));

  assert.deepEqual(exists('', []), ['foobar']);
});
