import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('validation-wrapper', 'Unit | Component | validation wrapper', {
  needs: ['validation:required', 'validation:email'],
  unit: true
});

test('registers component on init', function(assert) {
  assert.expect(1);

  let register = null;

  const component = this.subject({
    register(params) {
      register = params;
    }
  });

  this.render();

  assert.equal(register, component);
});

test('loads rules on #init', function(assert) {
  assert.expect(1);

  const component = this.subject({
    rules: 'required',
    register() {}
  });

  this.render();

  let rules = component.get('selectedRules');

  assert.equal(rules.length, 1);
});

test('rules are optional by default', function(assert) {
  assert.expect(2);

  const component = this.subject({
    rules: 'email',
    register() {}
  });
  
  this.render();

  component.send('validate');

  let valid = component.get('valid');
  let errors = component.get('errors');

  assert.equal(valid, true);
  assert.equal(errors, null);
});

test('#checkForValid should not set errors', function(assert) {
  assert.expect(2);

  const component = this.subject({
    rules: 'required',
    register() {}
  });

  this.render();

  component.send('checkForValid');
  
  let valid = component.get('valid');
  let errors = component.get('errors');

  assert.equal(valid, null);
  assert.equal(errors, null);
});

test('#checkForValid should clear errors', function(assert) {
  assert.expect(4);

  const component = this.subject({
    rules: 'required',
    register() {}
  });

  this.render();

  component.send('validate');

  let valid;
  let errors;

  valid = component.get('valid');
  errors = component.get('errors');

  assert.equal(valid, false);
  assert.deepEqual(errors, ['This field is required']);

  component.set('value', 'foobar');
  component.send('checkForValid');
  
  valid = component.get('valid');
  errors = component.get('errors');

  assert.equal(valid, true);
  assert.equal(errors, null);
});

test('#validate', function(assert) {
  assert.expect(4);

  const component = this.subject({
    rules: 'required',
    value: 'foo',
    register() {}
  });

  this.render();

  component.send('validate');

  let valid;
  let errors;

  valid = component.get('valid');
  errors = component.get('errors');

  assert.equal(valid, true);
  assert.equal(errors, null);


  component.set('value', '');

  component.send('validate');

  valid = component.get('valid');
  errors = component.get('errors');

  assert.equal(valid, false);
  assert.deepEqual(errors, ['This field is required']);
});

test('#reset', function(assert) {
  assert.expect(4);
  
  const outer = { registered: false, fields: [] };

  const component = this.subject({
    rules: 'required',
    value: '',
    register(context) {
      outer.registered = true;
      outer.fields.push(context);
    }
  });
  
  this.render();

  component.send('validate');

  let valid;
  let errors;

  valid = component.get('valid');
  errors = component.get('errors');

  assert.equal(valid, false);
  assert.deepEqual(errors, ['This field is required']);

  component.send('reset');

  valid = component.get('valid');
  errors = component.get('errors');

  assert.equal(valid, null);
  assert.equal(errors, null);
});

test('#validationState', function(assert) {
  assert.expect(15);

  const component = this.subject({
    register() {}
  });

  let formState;

  formState =  component.get('validationState');

  assert.equal(formState.valid, null);
  assert.equal(formState.isValid, false);
  assert.equal(formState.isInvalid, false);
  assert.equal(formState.isInitial, true);
  assert.equal(formState.text, 'initial');

  component.set('valid', true);

  formState =  component.get('validationState');

  assert.equal(formState.valid, true);
  assert.equal(formState.isValid, true);
  assert.equal(formState.isInvalid, false);
  assert.equal(formState.isInitial, false);
  assert.equal(formState.text, 'valid');

  component.set('valid', false);

  formState =  component.get('validationState');

  assert.equal(formState.valid, false);
  assert.equal(formState.isValid, false);
  assert.equal(formState.isInvalid, true);
  assert.equal(formState.isInitial, false);
  assert.equal(formState.text, 'invalid');
});

test('#totalErrors', function(assert) {
  assert.expect(1);

  const component = this.subject({
    register() {},
    errors: 'foo',
    submitErrors: 'bar'
  });

  this.render();

  let totalErrors = component.get('totalErrors');

  assert.deepEqual(totalErrors, ['bar', 'foo']);
});
