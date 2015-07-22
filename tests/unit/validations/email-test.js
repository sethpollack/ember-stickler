import Ember from 'ember';
import emailValidator  from '../../../validations/email';
import { module, test } from 'qunit';

module('Unit | Validation | email');

test('valid', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let email = emailValidator.validate.bind(Context.create({}));

  let result = email('f@b.c', []);

  assert.deepEqual(result, []);
});

test('inValid', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let email = emailValidator.validate.bind(Context.create({}));

  let result = email('fb.c', []);
  assert.deepEqual(result, ['A valid email address is required']);
});

test('message override', function(assert) {
  assert.expect(1);

  let Context = Ember.Object.extend({});

  let email = emailValidator.validate.bind(Context.create({emailMessage: 'foo'}));

  let result = email('fb.c', []);
  assert.deepEqual(result, ['foo']);
});
