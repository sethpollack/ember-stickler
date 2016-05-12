import Ember from 'ember';
import dateISOValidator  from '../../../validations/dateISO';
import { module, test } from 'qunit';

module('Unit | Validation | dateISO');

test('valid', function(assert) {
  assert.expect(8);

  const Context = Ember.Object.extend({});
  const dateISO = dateISOValidator.validate.bind(Context.create({}));
  const errors = [];

  assert.deepEqual(dateISO('1990-06-06', []), errors);
  assert.deepEqual(dateISO('1990-01-01', []), errors);
  assert.deepEqual(dateISO('1990-01-31', []), errors);
  assert.deepEqual(dateISO('1990-12-01', []), errors);
  assert.deepEqual(dateISO('1990-12-31', []), errors);
  assert.deepEqual(dateISO('1990/06/06', []), errors);
  assert.deepEqual(dateISO('1990-6-6', []), errors);
  assert.deepEqual(dateISO('1990/6/6', []), errors);
});

test('inValid', function(assert) {
  assert.expect(8);

  const Context = Ember.Object.extend({});
  const dateISO = dateISOValidator.validate.bind(Context.create({}));
  const errors = ['Please enter a valid date.'];

  assert.deepEqual(dateISO('1990-106-06', []), errors);
  assert.deepEqual(dateISO('190-06-06', []), errors);
  assert.deepEqual(dateISO('1990-00-06', []), errors);
  assert.deepEqual(dateISO('1990-13-01', []), errors);
  assert.deepEqual(dateISO('1990-01-00', []), errors);
  assert.deepEqual(dateISO('1990-01-32', []), errors);
  assert.deepEqual(dateISO('1990-13-32', []), errors);
  assert.deepEqual(dateISO('', []), errors);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const dateISO = dateISOValidator.validate.bind(Context.create({ dateISOMessage: 'foo' }));

  assert.deepEqual(dateISO('1990-106-06', []), ['foo']);
});
