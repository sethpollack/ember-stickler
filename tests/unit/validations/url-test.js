import Ember from 'ember';
import urlValidator  from '../../../validations/url';
import { module, test } from 'qunit';

module('Unit | Validation | url');

test('valid', function(assert) {
  assert.expect(9);

  const Context = Ember.Object.extend({});
  const url = urlValidator.validate.bind(Context.create({}));
  const errors = [];

  assert.deepEqual(url('http://bassistance.de/jquery/plugin.php?bla=blu', []), errors);
  assert.deepEqual(url('https://bassistance.de/jquery/plugin.php?bla=blu', []), errors);
  assert.deepEqual(url('ftp://bassistance.de/jquery/plugin.php?bla=blu', []), errors);
  assert.deepEqual(url('http://www.føtex.dk/', []), errors);
  assert.deepEqual(url('http://bösendorfer.de/', []), errors);
  assert.deepEqual(url('http://142.42.1.1', []), errors);
  assert.deepEqual(url('http://pro.photography', []), errors);
  assert.deepEqual(url('//code.jquery.com/jquery-1.11.3.min.js', []), errors);
  assert.deepEqual(url('//142.42.1.1', []), errors);
});

test('invalid', function(assert) {
  assert.expect(8);

  const Context = Ember.Object.extend({});
  const url = urlValidator.validate.bind(Context.create({}));
  const errors = ['Please enter a valid URL.'];

  assert.deepEqual(url('htp://code.jquery.com/jquery-1.11.3.min.js', []), errors);
  assert.deepEqual(url('http://192.168.8.', []), errors);
  assert.deepEqual(url('http://bassistance', []), errors);
  assert.deepEqual(url('http://bassistance.', []), errors);
  assert.deepEqual(url('http://bassistance,de', []), errors);
  assert.deepEqual(url('http://bassistance;de', []), errors);
  assert.deepEqual(url('http://.bassistancede', []), errors);
  assert.deepEqual(url('bassistance.de', []), errors);
});

test('overrides message', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const url = urlValidator.validate.bind(Context.create({ urlMessage: 'foo' }));

  assert.deepEqual(url('htp://code.jquery.com/jquery-1.11.3.min.js', []), ['foo']);
});
