import Ember from 'ember';
import maxLengthValidator  from '../../../validations/max-length';
import { module, test } from 'qunit';

module('Unit | Validation | maxLength');

test('valid', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let maxLength = maxLengthValidator.validate.bind(Context.create({maxLengthValue: '2'}));

  let result = maxLength('1', []);

  assert.deepEqual(result, []);
});

test('inValid', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let maxLength = maxLengthValidator.validate.bind(Context.create({maxLengthValue: '2'}));

  let result = maxLength('123', []);
  assert.deepEqual(result, ['Max length of 2 allowed']);
});

test('message override', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let maxLength = maxLengthValidator.validate.bind(Context.create({maxLengthValue: '2', maxLengthMessage: 'foobar'}));

  let result = maxLength('123', []);
  assert.deepEqual(result, ['foobar']);
});
