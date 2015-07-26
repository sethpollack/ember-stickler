import Ember from 'ember';
import emailValidator  from '../../../validations/email';
import { module, test } from 'qunit';

module('Unit | Validation | email');

test('valid', function(assert) {
  assert.expect(10);

  const Context = Ember.Object.extend({});
  const email = emailValidator.validate.bind(Context.create({}));
  const errors = [];

  assert.deepEqual(email('name@domain', []), errors);
  assert.deepEqual(email('name@domain.tld', []), errors);
  assert.deepEqual(email('name@domain.tl', []), errors);
  assert.deepEqual(email('bart+bart@tokbox.com', []), errors);
  assert.deepEqual(email('bart+bart@tokbox.travel', []), errors);
  assert.deepEqual(email('n@d.tld', []), errors);
  assert.deepEqual(email('bla.blu@g.mail.com', []), errors);
  assert.deepEqual(email('name.@domain.tld', []), errors);
  assert.deepEqual(email('name@website.a', []), errors);
  assert.deepEqual(email('name@pro.photography', []), errors);
});

test('inValid', function(assert) {
  assert.expect(8);

  const Context = Ember.Object.extend({});
  const email = emailValidator.validate.bind(Context.create({}));
  const errors = ['A valid email address is required'];

  assert.deepEqual(email('ole@føtex.dk', []), errors);
  assert.deepEqual(email('jörn@bassistance.de', []), errors);
  assert.deepEqual(email('name', []), errors);
  assert.deepEqual(email('test@test-.com', []), errors);
  assert.deepEqual(email('name@', []), errors);
  assert.deepEqual(email('name,@domain.tld', []), errors);
  assert.deepEqual(email('name;@domain.tld', []), errors);
  assert.deepEqual(email('name;@domain.tld.', []), errors);
});

test('message override', function(assert) {
  assert.expect(1);

  const Context = Ember.Object.extend({});
  const email = emailValidator.validate.bind(Context.create({emailMessage: 'foo'}));

  assert.deepEqual(email('fb.c', []), ['foo']);
});
