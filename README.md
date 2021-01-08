# Stylus BEM mixins

stylus BEM syntactic sugar

- [Installation](##installation)
- [Javascript API](##javascript-api)
  - [Options](###Options)
- [Using with Webpack](##using-with-webpack)
- [Using with Gulp](##using-with-gulp)
- [Examples](##examples)
  - [Block](###block)
  - [Element](###element)
  - [Modifier](###modifier)
  - [State (Auxiliary prefix)](###state 'auxiliary-prefix')
  - [Same selector](###same-selector)
  - [Nesting rules](###nesting-rules)

## Installation

```sh
npm install stylus-bem-mixins
```

## Javascript API

```javascript
var stylus = require('stylus')
var stylusBemMixins = require('stylus-bem-mixins')

var str = `
	@import 'node_modules/stylus-bem-mixins/index.styl'

	+b(button) {
		content: 'button';
		
		+e(icon) {
			content: 'icon';
			
			+m(small) {
				content: 'small';
			}
		}
	}
`

stylus(str)
  .use(stylusBemMixins())
  .render(function(err, css) {
    if (err) throw err
    console.log(css)
  })
```

### Options:

You can custom separator

```javascript
var option = {
  namespace: 'my', // default ''
  elementSeparator: '__', // default '__'
  modifierSeparator: '--', // default '--'
  statePrefix: 'is-' // default 'is-'
}
stylusBemMixins(option)
```

## Using with Webpack

Use only the default settings, quick use

```stylus
// in your stylus file
@import '~stylus-bem-mixins/index.styl'
```

Custom separator in webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'stylus-loader', // compiles Stylus to CSS
            options: {
              stylusOptions: {
                use: [
                  require('stylus-bem-mixins')({
                    namespace: 'my'
                  })
                ],
                import: ['stylus-bem-mixins']
              }
            }
          }
        ]
      }
    ]
  }
}
```

In Vue CLI

```javascript
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        use: [
          require('stylus-bem-mixins')({
            namespace: 'my'
          })
        ],
        import: ['stylus-bem-mixins']
      }
    }
  }
}
```

## Using with Gulp

```javascript
// ...
const { series, src, dest } = require('gulp')
const stylus = require('gulp-stylus')
const stylusBemMixins = require('stylus-bem-mixins')({
  namespace: 'my'
})

function compileFile() {
  return src('./test.styl')
    .pipe(stylus({ use: stylusBemMixins }))
    .pipe(dest('./'))
}
series(compileFile)
// ...
```

## Examples

Namespace is "my", other settings are default

### Block

```stylus
+b(form) {
	background: #ddd;
}
```

Compiles to:

```css
.my-form {
  background: #ddd;
}
```

### Element

```stylus
+b(form) {
	background: #ddd;

	+e(input) {
		width: 200px;
	}

    +m(danger) {
		border: 1px solid #f00;

		+e(icon) {
			color: #f00;
		}
	}

    +when(loading) {
		color: #666;

		+e(input) {
			border-color: #ccc;
		}
	}
}
```

Compiles to:

```css
.my-form {
  background: #ddd;
}
.my-form__input {
  width: 200px;
}
.my-form--danger {
  border: 1px solid #f00;
}
.my-form--danger .my-form__icon {
  color: #f00;
}
.my-form.is-loading {
  color: #666;
}
.my-form.is-loading .my-form__input {
  border-color: #ccc;
}
```

### Modifier

```stylus
+b(form) {
	background: #ddd;

	+m(danger) {
		border: 1px solid #f00;
	}

    +e(button) {
		border-radius: 4px;

		+m(small) {
			width: 150px;
		}
	}

    +when(disabled) {
		color: #999;

		+e(select) {
			border-color: #666;

			+m(small) {
				font-size: 12px;
			}
		}
	}
}
```

Compiles to:

```css
.my-form {
  background: #ddd;
}
.my-form--danger {
  border: 1px solid #f00;
}
.my-form__button {
  border-radius: 4px;
}
.my-form__button--small {
  width: 150px;
}
.my-form.is-disabled {
  color: #999;
}
.my-form.is-disabled .my-form__select {
  border-color: #666;
}
.my-form.is-disabled .my-form__select--small {
  font-size: 12px;
}
```

### State (optional prefix)

You will use it in some cases, such as getting dom elements

```stylus
+b(form) {
	background: #ddd;

	+when(loading) {
		color: #666;
	}

    +e(button) {
		border-radius: 4px;

		+when(disabled) {
			color: #666;
		}
	}

    +m(danger) {
		border: 1px solid #f00;

		+e(input) {
			border-color: #f0a;

			+when(disabled) {
				color: #999;
			}
		}
	}
}
```

Compiles to:

```css
.my-form {
  background: #ddd;
}
.my-form.is-loading {
  color: #666;
}
.my-form__button {
  border-radius: 4px;
}
.my-form__button.is-disabled {
  color: #666;
}
.my-form--danger {
  border: 1px solid #f00;
}
.my-form--danger .my-form__input {
  border-color: #f0a;
}
.my-form--danger .my-form__input.is-disabled {
  color: #999;
}
```

### Same selector

Elements and Modifier can write multiple same selectors

```stylus
+b(form) {
	background: #ddd;

	+e(input, button) {
		width: 200px;
	}

	+m(danger, success) {
		font-weight: bold;
	}
}
```

Compiles to:

```css
.my-form {
  background: #ddd;
}
.my-form__input,
.my-form__button {
  width: 200px;
}
.my-form--danger,
.my-form--success {
  font-weight: bold;
}
```

Modifiercan nest in elements :

```stylus
+b(form) {
	background: #ddd;

	+e(input, button) {
		width: 200px;

		+m(danger, success) {
			font-weight: bold;
		}
	}
}
```

Compiles to:

```css
.my-form {
  background: #ddd;
}
.my-form__input,
.my-form__button {
  width: 200px;
}
.my-form__input--danger,
.my-form__button--danger,
.my-form__input--success,
.my-form__button--success {
  font-weight: bold;
}
```

Elements can nest in modifier:

```stylus
+b(form) {
	background: #ddd;

	+m(danger, success) {
		font-weight: bold;

		+e(input, button) {
			width: 200px;
		}
	}
}
```

Compiles to:

```css
.my-form {
  background: #ddd;
}
.my-form--danger,
.my-form--success {
  font-weight: bold;
}
.my-form--danger .my-form__input,
.my-form--success .my-form__input,
.my-form--danger .my-form__button,
.my-form--success .my-form__button {
  width: 200px;
}
```

### Nesting rules

1. "b" block mixins should be the outermost layer
2. Cannot nest itself
3. this is all nesting cases
   - B > E
   - B > E > M
   - B > E > when
   - B > M
   - B > M > E
   - B > M > E > when
   - B > when
   - B > when > E
   - B > when > E > M

Examples:

```stylus
/*---------------------- B > E ----------------------*/
/*
+b(form) {
	background: #ddd;
	
	+e(input) {
		width: 200px;
	}
}
*/
.my-form {
  background: #ddd;
}
.my-form__input {
  width: 200px;
}
/*---------------------- B > E > M ----------------------*/
/*
+b(form) {
	background: #ddd;
	
	+e(button) {
		border-radius: 4px;
		
		+m(small) {
			width: 150px;
		}
	}
}
*/
.my-form {
  background: #ddd;
}
.my-form__button {
  border-radius: 4px;
}
.my-form__button--small {
  width: 150px;
}
/*---------------------- B > E > when ----------------------*/
/*
+b(form) {
	background: #ddd;
	
	+e(button) {
		border-radius: 4px;
		
		+when(disabled) {
			color: #666;
		}
	}
}
*/
.my-form {
  background: #ddd;
}
.my-form__button {
  border-radius: 4px;
}
.my-form__button.is-disabled {
  color: #666;
}
/*---------------------- B > M ----------------------*/
/*	
+b(form) {
	background: #ddd;
	
	+m(danger) {
		border: 1px solid #f00;
	}
}
*/
.my-form {
  background: #ddd;
}
.my-form--danger {
  border: 1px solid #f00;
}
/*---------------------- B > M > E ----------------------*/
/*
+b(form) {
	background: #ddd;

	+m(danger) {
		border: 1px solid #f00;

		+e(icon) {
			color: #f00;
		}
	}
}
*/
.my-form {
  background: #ddd;
}
.my-form--danger {
  border: 1px solid #f00;
}
.my-form--danger .my-form__icon {
  color: #f00;
}
/*---------------------- B > M > E > when ----------------------*/
/*
+b(form) {
	background: #ddd;

	+m(danger) {
		border: 1px solid #f00;

		+e(input) {
			border-color: #f0a;
			
			+when(disabled) {
				color: #999;
			}
		}
	}
}
*/
.my-form {
  background: #ddd;
}
.my-form--danger {
  border: 1px solid #f00;
}
.my-form--danger .my-form__input {
  border-color: #f0a;
}
.my-form--danger .my-form__input.is-disabled {
  color: #999;
}
/*---------------------- B > when ----------------------*/
/*
+b(form) {
	background: #ddd;
	
	+when(loading) {
		color: #666;
	}
}
*/
.my-form {
  background: #ddd;
}
.my-form.is-loading {
  color: #666;
}
/*---------------------- B > when > E ----------------------*/
/*
+b(form) {
	background: #ddd;
	
	+when(loading) {
		color: #666;
		
		+e(input) {
			border-color: #ccc;
		}
	}
}
*/
.my-form {
  background: #ddd;
}
.my-form.is-loading {
  color: #666;
}
.my-form.is-loading .my-form__input {
  border-color: #ccc;
}
/*---------------------- B > when > E > M ----------------------*/
/*
+b(form) {
	background: #ddd

	+when(disabled) {
		color: #999;

		+e(select) {
			border-color: #666;

			+m(small) {
				font-size: 12px;
			}
		}
	}
}
*/
.my-form {
  background: #ddd;
}
.my-form.is-disabled {
  color: #999;
}
.my-form.is-disabled .my-form__select {
  border-color: #666;
}
.my-form.is-disabled .my-form__select--small {
  font-size: 12px;
}
```
