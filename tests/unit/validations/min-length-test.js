import Ember from 'ember';
import minLengthValidator  from '../../../validations/min-length';
import { module, test } from 'qunit';

module('Unit | Validation | minLength');

test('valid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const minLength = minLengthValidator.validate.bind(Context.create({ minLength: '2' }));

  assert.deepEqual(minLength('123', []), []);
});

test('inValid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const minLength = minLengthValidator.validate.bind(Context.create({ minLength: '2' }));

  assert.deepEqual(minLength('1', []), ['Please enter at least 2 characters.']);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const minLength = minLengthValidator.validate.bind(Context.create({ minLength: '2', minLengthMessage: 'foobar' }));

  assert.deepEqual(minLength('1', []), ['foobar']);
});
