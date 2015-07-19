import Ember from 'ember';
import existsValidator  from '../../../validations/exists';
import { module, test } from 'qunit';

module('Unit | Validation | exists');

test('valid', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let exists = existsValidator.validate.bind(Context.create({}));

  let result = exists('foo', []);

  assert.deepEqual(result, []);
});

test('inValid', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let exists = existsValidator.validate.bind(Context.create({}));

  let result = exists('', []);
  assert.deepEqual(result, ['This field is required']);
});

test('message override', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let exists = existsValidator.validate.bind(Context.create({existsMessage: 'foobar'}));

  let result = exists('', []);
  assert.deepEqual(result, ['foobar']);
});
