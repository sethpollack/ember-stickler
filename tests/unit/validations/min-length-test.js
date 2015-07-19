import Ember from 'ember';
import minLengthValidator  from '../../../validations/min-length';
import { module, test } from 'qunit';

module('Unit | Validation | minLength');

test('valid', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let minLength = minLengthValidator.validate.bind(Context.create({minLengthValue: '2'}));

  let result = minLength('123', []);

  assert.deepEqual(result, []);
});

test('inValid', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let minLength = minLengthValidator.validate.bind(Context.create({minLengthValue: '2'}));

  let result = minLength('1', []);
  assert.deepEqual(result, ['Min length of 2 allowed']);
});

test('message override', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let minLength = minLengthValidator.validate.bind(Context.create({minLengthValue: '2', minLengthMessage: 'foobar'}));

  let result = minLength('1', []);
  assert.deepEqual(result, ['foobar']);
});
