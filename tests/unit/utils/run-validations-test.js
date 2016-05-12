import Ember from 'ember';
import runValidations from '../../../utils/run-validations';
import { module, test } from 'qunit';

module('Unit | Utility | run validations');

// Replace this with your real tests.
test('it works', function(assert) {
  let context = Ember.Object.create({
    value: '',
    rules: []
  });
  let result = runValidations(context);

  assert.ok(result);
});
