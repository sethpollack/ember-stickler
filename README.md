[![NPM Version](http://img.shields.io/npm/v/ember-stickler.svg?style=flat-square)](https://www.npmjs.com/package/ember-stickler)
[![NPM Downloads](http://img.shields.io/npm/dm/ember-stickler.svg?style=flat-square)](https://www.npmjs.com/package/ember-stickler)
[![NPM License](http://img.shields.io/npm/l/ember-stickler.svg?style=flat-square)](https://www.npmjs.com/package/ember-stickler)
[![Travis Build Status](https://img.shields.io/travis/sethpollack/ember-stickler.svg?style=flat-square)](https://travis-ci.org/sethpollack/ember-stickler)
[![Code Climate](https://img.shields.io/codeclimate/github/sethpollack/ember-stickler.svg?style=flat-square)](https://codeclimate.com/github/sethpollack/ember-stickler)
[![Code Climate Coverage](https://img.shields.io/codeclimate/coverage/github/sethpollack/ember-stickler.svg?style=flat-square)](https://codeclimate.com/github/sethpollack/ember-stickler)

# Ember Stickler

**Component based validations for ember**

Install with:

```
ember install ember-stickler
```

ember-stickler is comprised of two components `validated-form` and `validation-wrapper`. The `validation-wrappers` wrap around each input and are nested inside a `validated-form`.

```hbs
  {{#validated-form}}
    {{#validation-wrapper}}
      <input type='text' value={{value}}/>
    {{/validation-wrapper}}
  {{/validated-form}}
```

`validation-wrappers` are registered with the `register` action yielded by the `validated-form`.

```hbs
  {{#validated-form as |register|}}
    {{#validation-wrapper register=register}}
      <input type='text' value={{value}}/>
    {{/validation-wrapper}}
  {{/validated-form}}
```

This allows the `validated-form` to track each of the inputs. `validated-form` also yields  a `submit` which will trigger the validations in each of the registered wrappers and submit if they all pass.

`validated-form` also yields a `reset` actions which will set all the validation state and errors back to their initial state. (However, it will not interfere the actual form values, you will need to reset those yourself).

`validated-form` submits by calling `sendAction` on whatever action attr you add and will default to `submit`. It invokes the action passing the following arguments `reset`, `resolve`, `reject`.

`reset` will reset all the state and errors, `resolve` will change the form state from `pending` to `resolved` and reject takes an error object with keys being the name of the field and value an array of error message strings.

You can do something like this in your route:

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

and finally the `validated-form` yields a `formState` object with the following properties:

* `isDefault`
* `isPending`
* `isResolved`
* `text` // default, pending, resolved, rejected.
* `disabled` // will be false when valid or is `disableDuringSubmit` attr is added to the `validated-form` and the submit is pending.


Validation rules are added to the `validation-wrappers` with a rules attribute `rules=''` (separated by spaces). Messages and other defaults can be overridden with additional camelCased attributes formatted like `<validation-name><option>`.

```hbs
  {{#validated-form as |register submit reset submitErrors formState|}}
    {{#validation-wrapper
      register=register
      submitErrors=submitErrors.firstName
      rules='required min-length'
      minLengthValue=5
      minLengthMessage='a minimum of 5 characters is required'
    }}
      <input type='text' value={{firstName}}/>
    {{/validation-wrapper}}
  {{/validated-form}}
```

`validation-wrappers` yield two validation actions `checkForValid` which will ignore errors and only change the state when it passes the validation and `validate` which will check for both success and errors. They both take the current value as an argument.

```hbs
  {{#validated-form as |register submit reset submitErrors formState|}}
    {{#validation-wrapper
      register=register
      submitErrors=submitErrors.firstName
      rules='required min-length'
      minLengthValue=5
      minLengthMessage='a minimum of 5 characters is required'
      as |checkForValid validate|
    }}
      <input
      type='text'
      value={{firstName}}
      onblur={{action checkForValid value="target.checked"}}/>
      onchange={{action validate value="target.checked"}}/>
    {{/validation-wrapper}}
  {{/validated-form}}
```
additionally the `validation-wrappers` yield `errors` an array of error messages and a `validationState` object with the following properties:

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
{{#if errors}}
  <span>{{first errors}}</span>
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

## Transforms

* `trim`

> If you have any validations or transforms that you would like to add, please submit a pull request. Thanks!

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


## Full Example

```hbs
<div class='container'>
  <h2>Test Form</h2>

 {{#validated-form as |register submit reset submitErrors formState| }}

   {{#validation-wrapper
    class="input-group"
    register=register
    rules="exists is-eleven"
    submitErrors=submitErrors.intensity
    as |checkForValid validate errors validationState| }}

       <label for="intensity">Department To Route Campaign Responses To</label>
       <input type="range" id="intensity" value={{intensity}} min=0 max=11 oninput={{action validate value="target.value"}}>

     {{#if errors}}
         <div class="col-xs-12 text-small text-danger">{{first errors}}</div>
     {{/if}}

   {{/validation-wrapper}}


   {{#validation-wrapper
    class="input-group"
    register=register
    rules="exists"
    submitErrors=submitErrors.isIntense
    as |checkForValid validate errors validationState| }}

       <label for="checkbox-intensity">Department To Route Campaign Responses To</label>
       <input type="checkbox" id="checkbox-intensity" value={{isIntense}} onchange={{action validate value="target.checked"}} >

     {{#if errors}}
         <div class="col-xs-12 text-small text-danger">{{first errors}}</div>
     {{/if}}

   {{/validation-wrapper}}


   {{#validation-wrapper
    class="input-group"
    register=register
    rules="exists is-eleven"
    submitErrors=submitErrors.coolness
    as |checkForValid validate errors validationState| }}

       <label for="intensity">Department To Route Campaign Responses To</label>
       <select onchange={{action validate value="target.value"}}>
         {{#each choices key="@identity" as |choice|}}
             <option value={{choice}} selected={{is-equal coolness choice}}>{{choice}}</option>
         {{/each}}
       </select>

     {{#if errors}}
         <div class="col-xs-12 text-small text-danger">{{first errors}}</div>
     {{/if}}

   {{/validation-wrapper}}

   {{#validation-wrapper
    class="input-group"
    register=register
    rules='trim required min-length' minLengthValue='3'
    submitErrors=submitErrors.firstName
    as |checkForValid validate errors validationState| }}

      <div class="form-group {{class-state validationState.valid 'has-success' 'has-error'}}">
        <label for='firstName'>First Name</label>

        <input
          type="text"
          class='form-control'
          id='firstName'
          placeholder='first name'
          value={{firstName}}
          onblur={{ action (action validate) value='target.value' }}
          oninput={{ action (action checkForValid) value='target.value' }}>

        {{#if errors}}
          <span>{{first errors}}</span>
        {{/if}}
      </div>

   {{/validation-wrapper}}

   {{#validation-wrapper
    class="input-group"
    register=register
    rules='required max-length' maxLengthValue='3'
    submitErrors=submitErrors.lastName
    as |checkForValid validate errors validationState| }}

      <div class="form-group {{class-state validationState.valid 'has-success' 'has-error'}}">
        <label for='lastName'>Last Name</label>
        <input
          type="text"
          class='form-control'
          id='lastName'
          placeholder='last name'
          value={{lastName}}
          onblur={{ action (action validate) value='target.value' }}
          oninput={{ action (action checkForValid) value='target.value' }}>

        {{#if errors}}
          <span>{{first errors}}</span>
        {{/if}}
      </div>

   {{/validation-wrapper}}


   {{#validation-wrapper
    class="input-group"
    register=register
    rules='required email'
    submitErrors=submitErrors.email
    as |checkForValid validate errors validationState| }}

      <div class="form-group {{class-state validationState.valid 'has-success' 'has-error'}}">
        <label for='email'>Email</label>
        <input
          type="text"
          class='form-control'
          id='email'
          placeholder='email'
          value={{email}}
          onblur={{ action (action validate) value='target.value' }}
          oninput={{ action (action checkForValid) value='target.value' }}>

        {{#if errors}}
          <span>{{first errors}}</span>
        {{/if}}
      </div>

   {{/validation-wrapper}}
    <p>
      <button class='btn btn-primary' disabled={{formState.disabled}} {{action submit}}>Submit</button>
    </p>

 {{/validated-form}}

</div>

```

## Authors
* [Seth Pollack](https://github.com/sethpollack)
* [Chris Thoburn](https://github.com/runspired)

## License

The MIT License

Copyright (c) 2015 [sethpollack](https://github.com/sethpollack), [runspired](https://github.com/runspired)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
