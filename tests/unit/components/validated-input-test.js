import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('validated-input', 'Unit | Component | validated input', {
  needs: ['validation:required', 'validation:email'],
  unit: true
});

test('registers component on #didInsertElement', function(assert) {
  assert.expect(1);

  const component = this.subject();

  component.set('register', function(params) {
    assert.equal(params, component);
  });

  this.render();
});

test('loads rules on #init', function(assert) {
  assert.expect(1);

  const component = this.subject();

  component.set('rules', 'required');
  component.set('register', function() {});
  component.set('setState', function(params) {
    assert.deepEqual(params, {
      valid: false,
      errors: [{ message: 'This field is required' }]
    });
  });

  component.trigger('init');

  this.render();

  component.send('validate');
});

test('optional by default', function(assert) {
  assert.expect(1);

  const component = this.subject();

  component.set('rules', 'email');
  component.set('register', function() {});
  component.set('setState', function(params) {
    assert.deepEqual(params, {
      valid: true,
      errors: null
    });
  });

  component.trigger('init');

  this.render();

  component.send('validate');
});

test('#checkForValid', function(assert) {
  assert.expect(0);

  const component = this.subject();
  
  component.set('rules', 'required');
  component.set('register', function() {});
  component.set('setState', function(params) {
    assert.equal(false, true);
  });

  component.trigger('init');

  this.render();

  component.send('checkForValid');
});

test('#validate', function(assert) {
  assert.expect(2);

  const component = this.subject();

  Ember.run(function() {
    component.set('rules', 'required');
    component.set('value', 'foo');
    component.set('register', function() {});
    component.set('setState', function(params) {
      assert.deepEqual(params, {
        valid: true,
        errors: null
      });
    });
  });

  component.trigger('init');

  this.render();

  component.send('validate');

  Ember.run(function() {
    component.set('value', '');
    component.set('setState', function(params) {
      assert.deepEqual(params, {
        valid: false,
        errors: [{ message: 'This field is required' }]
      });
    });
  });

  component.send('validate');
});

test('#reset', function(assert) {
  assert.expect(2);

  const component = this.subject();

  Ember.run(function() {
    component.set('rules', 'required');
    component.set('value', '');
    component.set('register', function() {});
    component.set('setState', function(params) {
      assert.deepEqual(params, {
        valid: false,
        errors: [{ message: 'This field is required' }]
      });
    });
  });

  component.trigger('init');

  this.render();

  component.send('validate');

  Ember.run(function() {
    component.set('value', '');
    component.set('setState', function(params) {
      assert.deepEqual(params, {
        valid: null,
        errors: null
      });
    });
  });

  component.send('reset');
});