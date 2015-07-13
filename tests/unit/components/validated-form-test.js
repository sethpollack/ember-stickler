import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('validated-form', 'Unit | Component | validated form', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('#submit', function(assert) {
 assert.expect(2);
 
 const component = this.subject();
 
 const Obj = Ember.Object.extend({
   isValid: true,
   validate() {},
   send(params){
     assert.equal(params, 'validate');
   }
 });

 let object = Obj.create();

 Ember.run(function() {
  component.set('action', function(params) {
    assert.equal(params, component);
  });
 });
 
 Ember.run(function() {
   component.trigger('init');
 });
 
 Ember.run(function() {
   component.send('register', object);
 });

 Ember.run(function() {
   component.trigger('submit', { preventDefault() {} });
 }); 
});

test('#valid', function(assert) {
  assert.expect(2);

  const component = this.subject();
  let valid;

  const Obj = Ember.Object.extend({
    isValid: true,
    validate() {}
  });

  let object1 = Obj.create({ isValid: false });
  let object2 = Obj.create();
  let object3 = Obj.create();
  
  Ember.run(function() {
    component.trigger('init');
  });
  
  Ember.run(function() {
    component.send('register', object1);
    component.send('register', object2);
    component.send('register', object3);
  });

  valid = component.get('valid');

  assert.equal(valid, false);

  object1.set('isValid', true);
  
  valid = component.get('valid');

  assert.equal(valid, true);
});

test('#register', function(assert) {
  assert.expect(1);

  const component = this.subject();

  let object = {};
  
  Ember.run(function() {
    component.trigger('init');
  });

  Ember.run(function() {
    component.send('register', object);
  });

  let fields = component.get('fields');

  assert.deepEqual(fields, [object]);
});

test('#resetFields', function(assert) {
  assert.expect(1);

  const component = this.subject();

  let object = {
    send(params) {
      assert.equal(params, 'reset');
    }
  };
  
  Ember.run(function() {
    component.trigger('init');
  });
  
  Ember.run(function() {
    component.send('register', object);
  });

  Ember.run(function() {
    component.send('resetFields');
  });
});
