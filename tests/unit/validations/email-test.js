import Ember from 'ember';
import emailValidator  from '../../../validations/email';
import { module, test } from 'qunit';

module('Unit | Validation | email');

test('valid', function(assert) {
  assert.expect(2);

  let Context = Ember.Object.extend({});

  let email = emailValidator.validate.bind(Context.create({}));

  let errors = [];
  let result = email('f@b.c', errors);

  assert.equal(result, true);
  assert.deepEqual(errors, []);
});

test('inValid', function(assert) {
  assert.expect(2);

  let Context = Ember.Object.extend({});

  let email = emailValidator.validate.bind(Context.create({}));

  let errors = [];
  let result = email('fb.c', errors);
  assert.equal(result, false);
  assert.deepEqual(errors, ['A valid email address is required']);
});

test('message override', function(assert) {
  assert.expect(2);

  let Context = Ember.Object.extend({});

  let email = emailValidator.validate.bind(Context.create({emailMessage: 'foo'}));

  let errors = [];
  let result = email('fb.c', errors);
  assert.equal(result, false);
  assert.deepEqual(errors, ['foo']);
});
