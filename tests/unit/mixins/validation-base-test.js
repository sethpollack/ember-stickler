import Ember from 'ember';
import ValidationBaseMixin from '../../../mixins/validation-base';
import { module, test } from 'qunit';

module('Unit | Mixin | validation base');

// Replace this with your real tests.
test('it works', function(assert) {
  var ValidationBaseObject = Ember.Object.extend(ValidationBaseMixin);
  var subject = ValidationBaseObject.create();
  assert.ok(subject);
});
