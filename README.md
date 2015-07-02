# Stickler

TODO:

* Make rules extensible without the need for extending.
* Allow user to choose what event triggers validation.
* Right now we have two validation events one for full validation and one just to check for errors. Do we need anything more than that?
* Add Masking.
* Add Active Feedback.
* Fix up validation attributes API for a clean way to add an attribute with override messages and settings.

Current API:

```
{{#validated-form action='submit' }}

   {{#validated-area register='register' as |error valid| }}

       <div class="form-group {{class-state valid 'has-success' 'has-error'}}">
         <label for='firstName'>First Name</label>
         {{validated-input
           class='form-control'
           id='firstName'
           placeholder='first name'
           action='validate'
           register='register'
           value=firstName
         }}
         {{#unless valid}}
           <span>{{first-message errors}}</span>
         {{/unless}}
       </div>

   {{/validated-area}}

   <button class='btn btn-primary'>Submit</button>

{{/validated-form}}

```


## License

The MIT License

Copyright (c) 2015 [sethpollack](https://github.com/sethpollack)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.