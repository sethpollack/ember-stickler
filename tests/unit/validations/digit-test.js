import digitTransform  from '../../../validations/digit';
import { module, test } from 'qunit';

module('Unit | Transform | digit');

test('valid', function(assert) {
  assert.expect(1);

  const digit = digitTransform.transform;

  assert.deepEqual(digit('1-2*3+4&@#()'), '1234');
});
