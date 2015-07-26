import Ember from 'ember';
import maxLengthValidator  from '../../../validations/max-length';
import { module, test } from 'qunit';

module('Unit | Validation | maxLength');

test('valid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const maxLength = maxLengthValidator.validate.bind(Context.create({maxLength: '2'}));

  assert.deepEqual(maxLength('1', []), []);
});

test('inValid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const maxLength = maxLengthValidator.validate.bind(Context.create({maxLength: '2'}));

  assert.deepEqual(maxLength('123', []), ['Please enter no more than 2 characters.']);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const maxLength = maxLengthValidator.validate.bind(Context.create({maxLength: '2', maxLengthMessage: 'foobar'}));

  assert.deepEqual(maxLength('123', []), ['foobar']);
});
