import { firstMessage } from '../../../helpers/first-message';
import { module, test } from 'qunit';

module('Unit | Helper | first message');

test('it works', function(assert) {
	const errors = [{ message: 'foo' }, { message: 'bar' }];
  const result = firstMessage([errors]);
  assert.equal(result, 'foo');
});
