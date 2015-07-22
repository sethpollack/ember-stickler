import { first } from '../../../helpers/first';
import { module, test } from 'qunit';

module('Unit | Helper | first');

test('it works', function(assert) {
	const errors = ['foo', 'bar'];
  const result = first([errors]);
  assert.equal(result, 'foo');
});
