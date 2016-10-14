import Ember from 'ember';
import dobValidator  from '../../../validations/date-of-birth';
import { module, test } from 'qunit';

module('Unit | Validation | maxAge');

test('valid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const maxAge = dobValidator.validate.bind(Context.create({ maxAge: 110 }));

  assert.deepEqual(maxAge('1990-06-06', []), []);
});

test('inValid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const maxAge = dobValidator.validate.bind(Context.create({ maxAge: 110 }));

  assert.deepEqual(maxAge('1890-06-06', []), ['You must be younger than 110']);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const maxAge = dobValidator.validate.bind(Context.create({ maxAge: 110, maxAgeMessage: "That doesn't look right..." }));

  assert.deepEqual(maxAge('1890-06-06', []), ["That doesn't look right..."]);
});
