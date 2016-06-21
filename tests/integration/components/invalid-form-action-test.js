import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('validated-form', 'Integration | Component | validated-form', {
  integration: true
});

test('validation-form component calls passed invalidAction action when form is invalid', function(assert) {
  this.set('errorMessage', '');
  this.set('submitAction', function() {
    return;
  });
  this.set('invalidAction', function() {
    this.set('errorMessage', 'The Form has Errors');
  });
  this.render(hbs`
    {{#validated-form isValid=false action=(action submitAction) invalidAction=(action invalidAction) errorMessage=errorMessage as |form|}}
      <div id='error-message'>
        {{errorMessage}}
      </div>
      <button id="submit" type='submit'>Submit</button>
    {{/validated-form}}
  `);
  assert.equal(this.$('#error-message').text().trim(), '');
  this.$('#submit').click();
  assert.equal(this.$('#error-message').text().trim(), 'The Form has Errors');
});
