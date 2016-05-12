import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('validated-form', 'Unit | Component | validated form', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('should create fields on init', function(assert) {
  assert.expect(1);

  const component = this.subject();

  this.render();

  const fields = component.get('fields');

  assert.deepEqual(fields, []);
});

test('should register new fields', function(assert) {
  assert.expect(1);

  const component = this.subject();
  const field = {};

  this.render();

  Ember.run(function() {
    component.send('register', field);
  });

  const fields = component.get('fields');

  assert.deepEqual(fields, [field]);
});

test('should check if form is valid', function(assert) {
  assert.expect(2);

  const component = this.subject();

  const Obj = Ember.Object.extend({
    valid: true,
    validate() {}
  });

  let object1 = Obj.create({ valid: false });
  let object2 = Obj.create();
  let object3 = Obj.create();

  this.render();

  Ember.run(function() {
    component.send('register', object1);
    component.send('register', object2);
    component.send('register', object3);
  });

  let isValid;

  isValid = component.get('isValid');

  assert.equal(isValid, false);

  object1.set('valid', true);

  isValid = component.get('isValid');

  assert.equal(isValid, true);
});

test('should set form state', function(assert) {
  assert.expect(30);

  const component = this.subject();
  let formState;

  formState =  component.get('formState');

  assert.equal(formState.isDefault, true);
  assert.equal(formState.isPending, false);
  assert.equal(formState.isResolved, false);
  assert.equal(formState.isRejected, false);
  assert.equal(formState.disabled, false);
  assert.equal(formState.text, 'default');

  component.set('isValid', false);

  formState =  component.get('formState');

  assert.equal(formState.isDefault, true);
  assert.equal(formState.isPending, false);
  assert.equal(formState.isResolved, false);
  assert.equal(formState.isRejected, false);
  assert.equal(formState.disabled, true);
  assert.equal(formState.text, 'default');

  component.set('isValid', true);
  component.set('disableDuringSubmit', true);
  component.set('_promiseState', 'pending');

  formState =  component.get('formState');

  assert.equal(formState.isDefault, false);
  assert.equal(formState.isPending, true);
  assert.equal(formState.isResolved, false);
  assert.equal(formState.isRejected, false);
  assert.equal(formState.disabled, true);
  assert.equal(formState.text, 'pending');

  component.set('_promiseState', 'resolved');

  formState =  component.get('formState');

  assert.equal(formState.isDefault, false);
  assert.equal(formState.isPending, false);
  assert.equal(formState.isResolved, true);
  assert.equal(formState.isRejected, false);
  assert.equal(formState.disabled, false);
  assert.equal(formState.text, 'resolved');

  component.set('_promiseState', 'rejected');

  formState =  component.get('formState');

  assert.equal(formState.isDefault, false);
  assert.equal(formState.isPending, false);
  assert.equal(formState.isResolved, false);
  assert.equal(formState.isRejected, true);
  assert.equal(formState.disabled, false);
  assert.equal(formState.text, 'rejected');
});

test('it should reset fields', function(assert) {
  assert.expect(1);

  const component = this.subject();

  let object = {
    send(params) {
      assert.equal(params, 'reset');
    }
  };

  this.render();

  Ember.run(function() {
    component.send('register', object);
  });

  Ember.run(function() {
    component.send('reset');
  });
});