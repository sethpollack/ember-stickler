[![NPM Version](http://img.shields.io/npm/v/ember-stickler.svg?style=flat-square)](https://www.npmjs.com/package/ember-stickler)
[![NPM Downloads](http://img.shields.io/npm/dm/ember-stickler.svg?style=flat-square)](https://www.npmjs.com/package/ember-stickler)
[![NPM License](http://img.shields.io/npm/l/ember-stickler.svg?style=flat-square)](https://www.npmjs.com/package/ember-stickler)
[![Travis Build Status](https://img.shields.io/travis/sethpollack/ember-stickler.svg?style=flat-square)](https://travis-ci.org/sethpollack/ember-stickler)
[![Code Climate](https://img.shields.io/codeclimate/github/sethpollack/ember-stickler.svg?style=flat-square)](https://codeclimate.com/github/sethpollack/ember-stickler)
[![Code Climate Coverage](https://img.shields.io/codeclimate/coverage/github/sethpollack/ember-stickler.svg?style=flat-square)](https://codeclimate.com/github/sethpollack/ember-stickler)

# Ember Stickler

****Flexible DDAU form validation handling**

Ember Stickler will handle errors from your server as easily and gracefully as
errors from the client.  If you've ever skimped on form validation or form
UX, and felt guilty, this library is your new guilty pleasure.

Stickler is comprised of two components: `validated-form` and 
and the contextual component `form.validation`, which manage your data
and error routing, and provide an easy access point to utilize validations.

# Installation

```cli
ember install ember-stickler
```

## Usage:

```hbs

{{#validated-form as |form|}}

 {{#form.validation
  value=intensity
  rules="exists is-eleven"
  submitErrors=form.errors.level
  as |validation| }}

     <label for="intensity">Department To Route Campaign Responses To</label>
     <input type="range" id="intensity" value={{validation.value}} min=0 max=11 oninput={{action validation.validate value="target.value"}}>

   {{#if validation.errors}}
       <div class="col-xs-12 text-small text-danger">{{first validation.errors}}</div>
   {{/if}}

 {{/form.validation}}


 {{#form.validation
   value=isIntense
   rules="exists"
   submitErrors=submitErrors.isIntense
   as |validation| }}

     <label for="checkbox-intensity">Department To Route Campaign Responses To</label>
     <input type="checkbox" id="checkbox-intensity" value={{validation.value}} onchange={{action validation.validate value="target.checked"}} >

   {{#if validation.errors}}
       <div class="col-xs-12 text-small text-danger">{{first validation.errors}}</div>
   {{/if}}

 {{/form.validation}}


 {{#form.validation
  value=coolness
  rules="exists is-eleven"
  submitErrors=submitErrors.coolFactor
  as |validation| }}

     <label for="intensity">Department To Route Campaign Responses To</label>
     <select onchange={{action validation.validate value="target.value"}}>
       {{#each choices as |choice|}}
           <option value={{choice}} selected={{is-equal validation.value choice}}>{{choice}}</option>
       {{/each}}
     </select>

   {{#if validation.errors}}
       <div class="col-xs-12 text-small text-danger">{{first validation.errors}}</div>
   {{/if}}

 {{/form.validation}}

 {{#form.validation
  value=firstName
  rules='trim required min-length' minLengthValue='3'
  submitErrors=submitErrors.firstName
  as |validation| }}

    <div class="form-group {{class-state validation.state.valid 'has-success' 'has-error'}}">
      <label for='firstName'>First Name</label>

      <input
        type="text"
        class='form-control'
        id='firstName'
        placeholder='first name'
        value={{validation.value}}
        onblur={{ action validation.validate value='target.value' }}
        oninput={{ action validation.checkForValid value='target.value' }}>

      {{#if validation.errors}}
        <span>{{first validation.errors}}</span>
      {{/if}}
    </div>

 {{/form.validation}}

 {{#form.validation
  value=lastName
  rules='required max-length' maxLengthValue='3'
  submitErrors=submitErrors.lastName
  as |validation| }}

    <div class="form-group {{class-state validation.state.valid 'has-success' 'has-error'}}">
      <label for='lastName'>Last Name</label>
      <input
        type="text"
        class='form-control'
        id='lastName'
        placeholder='last name'
        value={{validation.value}}
        onblur={{ action validation.validate value='target.value' }}
        oninput={{ action validation.checkForValid value='target.value' }}>

      {{#if validation.errors}}
        <span>{{first validation.errors}}</span>
      {{/if}}
    </div>

 {{/form.validation}}


 {{#form.validation
  value=email
  rules='required email'
  submitErrors=submitErrors.email
  as |validation| }}

    <div class="form-group {{class-state validation.state.valid 'has-success' 'has-error'}}">
      <label for='email'>Email</label>
      <input
        type="text"
        class='form-control'
        id='email'
        placeholder='email'
        value={{validation.value}}
        onblur={{ action validation.validate value='target.value' }}
        oninput={{ action validation.checkForValid value='target.value' }}>

      {{#if validation.errors}}
        <span>{{first validation.errors}}</span>
      {{/if}}
    </div>

 {{/form.validation}}
  <p>
    <button class='btn btn-primary' type="submit" disabled={{form.state.disabled}} {{action form.submit}}>Submit</button>
  </p>

{{/validated-form}}

```


Validations are added with a rules attribute `rules=''` and are separated by spaces.
Messages and other defaults can be overridden with additional camelCased attributes formatted 
like `<validation-name><option>`.

```hbs
  {{#validated-form}}
    {{#validation-wrapper}}
      <input type='text' value={{value}}/>
    {{/validation-wrapper}}
  {{/validated-form}}
```

### Validated Form

```hbs
  {{#validated-form as |register submit reset submitErrors formState|}}

  {{/validated-form}}
```
`validated-form` submits by calling `sendAction` on whatever action attr you add and will default to `submit`. It invokes the action passing the following arguments `reset`, `resolve`, `reject`.

The `validated-form` yields the following:

1. `register`, this is used by the `validation-wrappers` to register themselves with the form.

2. `submit` this will trigger the validations in each of the `validation-wrappers` and will submit if they all pass.

3. `reset` sets all the validation state and errors back to their initial state and changes the form state from `pending` to `resolved` and reject takes an error object with keys being the name of the field and value an array of error message strings.

4. `formState` an object with the following properties:
  * `isDefault`
  * `isPending`
  * `isResolved`
  * `text` // default, pending, resolved, rejected.
  * `disabled` // will be false when valid or is `disableDuringSubmit` attr is added to the `validated-form` and the submit is pending.


All this allows you to do something like this in your route:

```javascript
actions: {
  submit(reset, resolve, reject) {
    const self = this;
    self.get('service').submit({
      firstName: self.controller.get('firstName'),
      lastName: self.controller.get('lastName'),
      age: self.controller.get('age'),
    })
    .then(function() {
      reset();
      resolve();
    })
    .catch(function(errors) {
      reject({
        firstName: errors.firstName, //['first name is invalid!']
        lastName: errors.lastName,
        age: errors.age,
      });
    });
  }
}
```
Errors are then yielded by the `validated-form` and passed to each of the individual `validation-wrappers`.

```hbs
  {{#validated-form as |register submit reset submitErrors formState|}}
    {{#validation-wrapper register=register submitErrors=submitErrors.firstName}}
      <input type='text' value={{firstName}}/>
    {{/validation-wrapper}}
  {{/validated-form}}
```

### Validation Wrapper

Validation rules are added to the `validation-wrappers` with a rules attribute `rules=''` (separated by spaces). Messages and other defaults can be overridden with additional camelCased attributes formatted like `<validation-name><option>`.

```hbs
  {{#validated-form as |register submit reset submitErrors formState|}}
    {{#validation-wrapper
      register=register
      submitErrors=submitErrors.firstName
      rules='required min-length'
      minLengthValue=5
      minLengthMessage='a minimum of 5 characters is required'
      as |checkForValid validate errors validationState|
    }}
    <input
      type='text'
      value={{firstName}}
      onblur={{action checkForValid value="target.checked"}}/>
      onchange={{action validate value="target.checked"}}/>
    {{/validation-wrapper}}
  {{/validated-form}}
```

The `validated-wrapper` yields the following:

1. `checkForValid` an action which will ignore errors and only change the state when it passes the validation.

2. `validate` which will check for both success and errors.

3. `errors` an array of error messages.

4. `validationState` object with the following properties:
  * `valid` // null, true, false
  * `isValid` // true, false
  * `isInvalid` // true, false
  * `isInitial` // true, false
  * `text` // valid, invalid, initial

## Helpers

stickler provides `class-state` helper for managing error classes it takes `valid` as the first param and then three classes first for true, the second for false and the third for null, the third param defaults to an empty string.

```hbs
  <div class="form-group {{class-state validationState.valid 'has-success' 'has-error'}}">
```

stickler also provides a `first` helper which you can use to get the first error message from `errors`

```hbs
{{#if validation.errors}}
  <span>{{first validation.errors}}</span>
{{/if}}
```

## Validations

#### Email

**Rule:** `email`

**Attrs:** `emailMessage`

#### Required

**Rule:** `required`

**Attrs:** `emailMessage`

#### Min Length

**Rule:** `min-length`

**Attrs:** `minLengthMessage`, `minLength`

#### Max Length

**Rule:** `max-length`

**Attrs:** `maxLengthMessage`, `maxLength`

#### Exists

**Rule:** `exists`

**Attrs:** `existsMessage`

#### Url

**Rule:** `url`

**Attrs:** `urlMessage`

#### Digits

**Rule:** `digits`

**Attrs:** `digitsMessage`

#### Number

**Rule:** `number`

**Attrs:** `numberMessage`

#### Date

**Rule:** `date`

**Attrs:** `dateMessage`

#### DateISO

**Rule:** `dateISO`

**Attrs:** `dateISOMessage`

#### Credit Card

**Rule:** `credit-card`

**Attrs:** `creditCardMessage`

#### Max

**Rule:** `max`

**Attrs:** `maxMessage`

#### Min

**Rule:** `min`

**Attrs:** `minMessage`

#### Format

**Rule:** `format`

**Attrs:** `formatMessage`, `format`

## Transforms

* `trim`
* `digit`

You can add more rules/transforms by creating a `app/validations` directory and adding a
file in the following formats:

For Validations:
```javascript
import Validation from 'ember-stickler/validation';
export default {
  validate(value, errors) {
    // add rule logic here
    // push message to errors
    // return errors
  }
}
```

For Transforms:

```javascript
import Transform from 'ember-stickler/transform';

export default Transform.create({
  transform(value) {
    // add transform logic here
    // return new value
  }
});

```

The `this` context in all the rules will be the component that the
rule is validating allowing access to the value `const value = this.get('value');` as well
as any other attrs `const value = this.get('minLengthMessage');`.


## Authors
* [Seth Pollack](https://github.com/sethpollack)
* [Chris Thoburn](https://github.com/runspired)

## License

The MIT License

Copyright (c) 2015 [sethpollack](https://github.com/sethpollack), [runspired](https://github.com/runspired)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
