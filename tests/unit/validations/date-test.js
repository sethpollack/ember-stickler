import Ember from 'ember';
import dateValidator  from '../../../validations/date';
import { module, test } from 'qunit';

module('Unit | Validation | date');

test('valid', function(assert) {
  assert.expect(3);

  const Context = Ember.Object.extend({});
  const date = dateValidator.validate.bind(Context.create({}));
  const errors = [];

  assert.deepEqual(date('06/06/1990', []), errors);
  assert.deepEqual(date('6/6/06', []), errors);
  assert.deepEqual(date('1990-06-06', []), errors);
});

test('inValid', function(assert) {
  assert.expect(2);

  const Context = Ember.Object.extend({});
  const date = dateValidator.validate.bind(Context.create({}));
  const errors = ['Please enter a valid date.'];

  assert.deepEqual(date('1990x-06-06', []), errors);
  assert.deepEqual(date('', []), errors);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const date = dateValidator.validate.bind(Context.create({ dateMessage: 'foo' }));

  assert.deepEqual(date('1990x-06-06', []), ['foo']);
});
