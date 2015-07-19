import Ember from 'ember';
import requiredValidator  from '../../../validations/required';
import { module, test } from 'qunit';

module('Unit | Validation | required');

test('valid', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let required = requiredValidator.validate.bind(Context.create({}));

  let result = required('foo', []);

  assert.deepEqual(result, []);
});

test('inValid', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let required = requiredValidator.validate.bind(Context.create({}));

  let result = required('', []);
  assert.deepEqual(result, ['This field is required']);
});

test('message override', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let required = requiredValidator.validate.bind(Context.create({requiredMessage: 'foobar'}));

  let result = required('', []);
  assert.deepEqual(result, ['foobar']);
});
