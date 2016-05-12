import Ember from 'ember';
import requiredValidator  from '../../../validations/required';
import { module, test } from 'qunit';

module('Unit | Validation | required');

test('valid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const required = requiredValidator.validate.bind(Context.create({}));

  assert.deepEqual(required('foo', []), []);
});

test('inValid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const required = requiredValidator.validate.bind(Context.create({}));

  assert.deepEqual(required('', []), ['This field is required']);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const required = requiredValidator.validate.bind(Context.create({ requiredMessage: 'foobar' }));

  assert.deepEqual(required('', []), ['foobar']);
});
