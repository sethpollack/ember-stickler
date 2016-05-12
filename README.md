[![NPM Version](http://img.shields.io/npm/v/ember-stickler.svg?style=flat-square)](https://www.npmjs.com/package/ember-stickler)
[![NPM Downloads](http://img.shields.io/npm/dm/ember-stickler.svg?style=flat-square)](https://www.npmjs.com/package/ember-stickler)
[![NPM License](http://img.shields.io/npm/l/ember-stickler.svg?style=flat-square)](https://www.npmjs.com/package/ember-stickler)
[![Travis Build Status](https://img.shields.io/travis/sethpollack/ember-stickler.svg?style=flat-square)](https://travis-ci.org/sethpollack/ember-stickler)
[![Code Climate](https://img.shields.io/codeclimate/github/sethpollack/ember-stickler.svg?style=flat-square)](https://codeclimate.com/github/sethpollack/ember-stickler)
[![Code Climate Coverage](https://img.shields.io/codeclimate/coverage/github/sethpollack/ember-stickler.svg?style=flat-square)](https://codeclimate.com/github/sethpollack/ember-stickler)

# Ember Stickler

**Flexible DDAU form validation handling**

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

{{#validated-form action=(action submitForm model) as |form|}}

  {{!-- with native inputs --}}
  {{#form.validation rules="exists" as |validation|}}

    <label for="intensity">Department To Route Campaign Responses To</label>
    <input type="range" id="intensity" value={{someValue}} min=0 max=11 oninput={{action validation.validate value="target.value"}}>

    {{#if validation.errors}}
      <div class="text-danger">{{first validation.errors}}</div>
    {{/if}}

 {{/form.validation}}
 
 {{!-- with Ember inputs --}}
 {{#form.validation minLength=8 rules="trim required min-length" as |v|}}
   {{input
       class=(join ' ' 'factsumo-input' (for-bool v.state.valid 'has-success' 'has-error'))
       type="password"
       autocomplete="new-password"
       placeholder='Password'
       value=myNewPassword
       focus-out=(action v.validate myNewPassword)
       input=(action v.check myNewPassword)
   }}
 {{/form.validation}}


 {{!-- with a native select --}}
 {{#form.validation rules="exists" as |validation|}}

     <select onchange={{action validation.validate value="target.value"}}>
       {{#each choices as |choice|}}
           <option value={{choice}} selected={{is-equal currentValue choice}}>{{choice}}</option>
       {{/each}}
     </select>

 {{/form.validation}}

  {{!-- submit buttons --}}
  <button type="submit" disabled={{form.state.disabled}} {{action form.submit}}>Submit</button>

{{/validated-form}}

```

## Validation Rules

Validations are added to `form.validation` components by specifying the `rules`
 attribute. Separate multiple rules by a space, rules will be run left to right,
 and special `transform` rules (such as `trim` can manipulate the value for cleaner
 comparisons.
 
 
```hbs
  {{#form.validation
      submitErrors=form.errors.firstName
      rules='required min-length'
      minLength=5
      minLengthMessage='a minimum of 5 characters is required'
      as |validation|
    }}
      ...
  {{/form.validation}}
```

## Validated Form Component


`validated-form` submits by calling `sendAction` on whatever action attr you add and will default to `submit`. It invokes the action passing the following arguments `reset`, `resolve`, `reject`.

The `validated-form` yields a hash with the following properties:

1. `submit` this will trigger the validations in each of the `validation-wrappers` and will submit if they all pass.

2. `reset` sets all the validation state and errors back to their initial state and changes the form state from `pending` to `resolved` and reject takes an error object with keys being the name of the field and value an array of error message strings.

3. `state` an object with the following properties:
  * `isDefault`
  * `isPending`
  * `isResolved`
  * `text` // default, pending, resolved, rejected.
  * `disabled` // will be false when valid or is `disableDuringSubmit` attr is added to the `validated-form` and the submit is pending.

4. `errors`

5. `validation` a contextual component you can use to localize error handling.

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
Errors are then yielded by the `validated-form` and passed to each of the individual `form.validation` components.

```hbs
  {{#validated-form as |form|}}
    {{#form.validation submitErrors=form.errors.firstName}}
      <input type='text' value={{firstName}}/>
    {{/form.validation}}
  {{/validated-form}}
```

## `form.validated` Component

The `form.validated` component yields the following:

1. `check` an action which will ignore errors and only change the state when it passes the validation.

2. `validate` an action which will check for both success and errors.

3. `errors` an array of error messages.

4. `state` object with the following properties:
  * `valid` // null, true, false
  * `isValid` // true, false
  * `isInvalid` // true, false
  * `isInitial` // true, false
  * `text` // valid, invalid, initial


## Helpers

Stickler provides a `for-bool` helper for managing error classes.
 It takes `valid` as the first param and then three classes.

  - first for true
  - second for false
  - third for null (defaults to an empty string)

```hbs
  <div class="form-group {{for-bool validation.state.valid 'has-success' 'has-error'}}">
```

Stickler also provides a `first` helper which you can use to get the first error message from `errors`

```hbs
{{#if validation.errors}}
  <span>{{first validation.errors}}</span>
{{/if}}
```

And a `join` helper which you can use when you need to combine strings
with a separator (it's first arg).

```
{{input
  class=(join ' ' 'class-a' 'class-b' 'class-c')
}}
```


## Default Validations

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

You can add your own rules and transforms.
 

**generate a transform**
```cli
ember g stickler-transform <name>
```

**generate a rule**
```cli
ember g stickler-rule <name>
```


## Authors

* [Seth Pollack](https://github.com/sethpollack)
* [Chris Thoburn](https://github.com/runspired)

## License

The MIT License

Copyright (c) 2015-2016 [sethpollack](https://github.com/sethpollack), [runspired](https://github.com/runspired)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
