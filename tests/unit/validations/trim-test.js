import trimTransform  from '../../../validations/trim';
import { module, test } from 'qunit';

module('Unit | Transform | trim');

test('valid', function(assert) {
  assert.expect(1);

  const trim = trimTransform.transform;

  assert.deepEqual(trim('foo   '), 'foo');
});
