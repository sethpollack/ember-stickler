import { forBool } from 'ember-stickler/helpers/for-bool';
import { module, test } from 'qunit';

module('Unit | Helper | class state');

test('it should return the trueClass', function(assert) {
  const result = forBool([true, 'true', 'false', 'init']);
  assert.equal(result, 'true');
});

test('it should return the falseClass', function(assert) {
  const result = forBool([false, 'true', 'false', 'init']);
  assert.equal(result, 'false');
});

test('it should return the initialClass', function(assert) {
  const result = forBool([null, 'true', 'false', 'init']);
  assert.equal(result, 'init');
});
