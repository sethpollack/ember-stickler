[![Build Status](https://img.shields.io/travis/sethpollack/ember-stickler.svg?style=flat-square)](https://travis-ci.org/sethpollack/ember-stickler)
[![Coveralls](https://img.shields.io/coveralls/sethpollack/ember-stickler.svg?style=flat-square)](https://coveralls.io/r/sethpollack/ember-stickler)
[![code climate](https://img.shields.io/codeclimate/github/sethpollack/ember-stickler.svg?style=flat-square)](https://codeclimate.com/github/sethpollack/ember-stickler)

# Ember Stickler

**Component based validations for ember**

Currently a WIP.

Install with:

```
ember install ember-stickler
```

Validations are added with a rules attribute `rules=''` and are seperated by spaces.
Messages and defaults can be overridden with addional camelCased attributes formatted 
like `<validation-name><option>`.

For example:

```hbs
  {{validated-input
    action='validate'
    value=message
    rules='minLength'
    minLengthMessage='A minimum of 10 characters are required'
    minLengthValue=5
  }}

```

### The following rules are available:

* `Email`
* `MinLength`
* `MaxLength`
* `Required`

You can add more rules by creating a `app/validations` directory and adding a 
file in the following format:

```javascript
export default {
  validate() {
    // add rule logic here
  }
}
```

The `this` context in all the rules will be the component that the 
rule is validating allowing access to the value `const value = this.get('value');` as well 
as any other attibutes `const value = this.get('minLengthMessage');`.


## Current API:

```hbs
 {{#validated-form action='submit' as |register| }}

    {{#validated-area as |setState errors valid state| }}

        <div class="form-group {{class-state valid 'has-success' 'has-error'}}">
          <label for='firstName'>First Name</label>
          {{validated-input
            class='form-control'
            id='firstName'
            placeholder='first name'
            register=register
            setState=setState
            rules='required min-length'
            minLengthValue='3'
            value=firstName
          }}
          {{#if errors}}
            <span>{{first-message errors}}</span>
          {{/if}}
        </div>

    {{/validated-area}}

    {{#validated-area as |setState errors valid state| }}

        <div class="form-group {{class-state valid 'has-success' 'has-error'}}">
          <label for='lastName'>Last Name</label>
          {{validated-input
            class='form-control'
            id='lastName'
            placeholder='last name'
            setState=setState
            register=register
            rules='required max-length'
            maxLengthValue='6'
            value=lastName
          }}
          {{#if errors}}
            <span>{{first-message errors}}</span>
          {{/if}}
        </div>

    {{/validated-area}}

    {{#validated-area as |setState errors valid state| }}

        <div class="form-group {{class-state valid 'has-success' 'has-error'}}">
          <label for='email'>Email</label>
          {{validated-input
            class='form-control'
            id='email'
            placeholder='email'
            setState=setState
            register=register
            rules='required email'
            emailMessage='please enter a valid email'
            value=email
          }}
          {{#if errors}}
            <span>{{first-message errors}}</span>
          {{/if}}
        </div>

    {{/validated-area}}

    <button class='btn btn-primary'>Submit</button>

 {{/validated-form}}

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
