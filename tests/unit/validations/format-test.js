import Ember from 'ember';
import formatValidator  from '../../../validations/format';
import { module, test } from 'qunit';

module('Unit | Validation | format');

test('valid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const format = formatValidator.validate.bind(Context.create({ format: /^\d+$/ }));
  const errors = [];

  assert.deepEqual(format('265', []), errors);
});

test('inValid', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const format = formatValidator.validate.bind(Context.create({ format: /^\d+$/ }));
  const errors = ['A valid format matching /^\\d+$/ is required'];

  assert.deepEqual(format('ole@føtex.dk', []), errors);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const format = formatValidator.validate.bind(Context.create({ formatMessage: 'foo', format: /^\d+$/ }));

  assert.deepEqual(format('fb.c', []), ['foo']);
});
