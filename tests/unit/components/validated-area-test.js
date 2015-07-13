import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('validated-area', 'Unit | Component | validated area', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('#validationState', function(assert) {
  assert.expect(3);

  const component = this.subject();

  this.render();

  assert.deepEqual(component.get('validationState'), {
    isValid: false,
    isInvalid: false,
    isInitial: true,
    text: 'initial'
  });

  Ember.run(function() {
    component.send('setState', {
      errors: null,
      valid: true
    });
  });

  assert.deepEqual(component.get('validationState'), {
    isValid: true,
    isInvalid: false,
    isInitial: false,
    text: 'valid'
  });

  Ember.run(function() {
    component.send('setState', {
      errors: [],
      valid: false
    });
  });

  assert.deepEqual(component.get('validationState'), {
    isValid: false,
    isInvalid: true,
    isInitial: false,
    text: 'invalid'
  });
});

