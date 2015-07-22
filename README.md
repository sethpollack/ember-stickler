[![ember-stickler](http://img.shields.io/npm/v/ember-stickler.svg?style=flat-square)](https://www.npmjs.com/package/ember-stickler)
[![ember-stickler](http://img.shields.io/npm/dm/ember-stickler.svg?style=flat-square)](https://www.npmjs.com/package/ember-stickler)
[![ember-stickler](http://img.shields.io/npm/l/ember-stickler.svg?style=flat-square)](https://www.npmjs.com/package/ember-stickler)
[![Build Status](https://img.shields.io/travis/sethpollack/ember-stickler.svg?style=flat-square)](https://travis-ci.org/sethpollack/ember-stickler)
[![Coveralls](https://img.shields.io/coveralls/sethpollack/ember-stickler.svg?style=flat-square)](https://coveralls.io/r/sethpollack/ember-stickler)
[![code climate](https://img.shields.io/codeclimate/github/sethpollack/ember-stickler.svg?style=flat-square)](https://codeclimate.com/github/sethpollack/ember-stickler)

# Ember Stickler

**Component based validations for ember**

Install with:

```
ember install ember-stickler
```

Validations are added with a rules attribute `rules=''` and are separated by spaces.
Messages and other defaults can be overridden with additional camelCased attributes formatted 
like `<validation-name><option>`.

For example:

```hbs
  {{validated-input
    action='validate'
    value=message
    rules='min-length'
    minLengthMessage='A minimum of 10 characters are required'
    minLengthValue=5
  }}

```

### The following rules are available:

* `email`
* `min-length`
* `max-length`
* `required`

### The following transforms are available:

* `trim`

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
as any other attibutes `const value = this.get('minLengthMessage');`.


## Current API:

```hbs
<div class='container'>
  <h2>Test Form</h2>

 {{#validated-form as |register submit reset submitErrors formState| }}

   {{#validation-wrapper
    class="input-group"
    value=intensity
    register=register
    rules="exists is-eleven"
    submitErrors=submitErrors.level
    as |level checkForValid validate errors validationState| }}

       <label for="intensity">Department To Route Campaign Responses To</label>
       <input type="range" id="intensity" value={{level}} min=0 max=11 oninput={{action validate value="target.value"}}>

     {{#if errors}}
         <div class="col-xs-12 text-small text-danger">{{first errors}}</div>
     {{/if}}

   {{/validation-wrapper}}


   {{#validation-wrapper
    class="input-group"
    value=isIntense
    register=register
    rules="exists"
    submitErrors=submitErrors.isIntense
    as |isIntense checkForValid validate errors validationState| }}

       <label for="checkbox-intensity">Department To Route Campaign Responses To</label>
       <input type="checkbox" id="checkbox-intensity" value={{isIntense}} onchange={{action validate value="target.checked"}} >

     {{#if errors}}
         <div class="col-xs-12 text-small text-danger">{{first errors}}</div>
     {{/if}}

   {{/validation-wrapper}}


   {{#validation-wrapper
    class="input-group"
    value=coolness
    register=register
    rules="exists is-eleven"
    submitErrors=submitErrors.coolFactor
    as |coolFactor checkForValid validate errors validationState| }}

       <label for="intensity">Department To Route Campaign Responses To</label>
       <select onchange={{action validate value="target.value"}}>
         {{#each choices key="@identity" as |choice|}}
             <option value={{choice}} selected={{is-equal coolFactor choice}}>{{choice}}</option>
         {{/each}}
       </select>

     {{#if errors}}
         <div class="col-xs-12 text-small text-danger">{{first errors}}</div>
     {{/if}}

   {{/validation-wrapper}}

   {{#validation-wrapper
    class="input-group"
    value=firstName
    register=register
    rules='trim required min-length' minLengthValue='3'
    submitErrors=submitErrors.firstName
    as |firstName checkForValid validate errors validationState| }}

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
    value=lastName
    register=register
    rules='required max-length' maxLengthValue='3'
    submitErrors=submitErrors.lastName
    as |lastName checkForValid validate errors validationState| }}

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
    value=email
    register=register
    rules='required email'
    submitErrors=submitErrors.email
    as |lastName checkForValid validate errors validationState| }}

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
