import Ember from 'ember';
import trimTransform  from '../../../validations/trim';
import { module, test } from 'qunit';

module('Unit | Transform | trim');

test('valid', function(assert) {
  assert.expect(1);

  let trim = trimTransform.transform;

  let result = trim('foo   ');

  assert.deepEqual(result, 'foo');
});