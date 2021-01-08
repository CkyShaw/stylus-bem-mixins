var str = `
@import '../index.styl'

+b(button) {
	content: 'button';
	
	+e(icon) {
		content: 'icon';
		
		+m(small) {
			content: 'small';
		}

		+m(large) {
			content: 'large';
		}

		+m(small, large) {
			color: #fff;
		}
	}
}
`

var stylus = require('stylus')
var stylusBemMixins = require('../lib/index.js')

var option = {
	namespace: 'my',
	elementSeparator: '__',
	modifierSeparator: '--',
	statePrefix: 'is-'
}

console.log(str)

console.log('----------------render start-------------------')

stylus(str)
	.use(stylusBemMixins(option))
	.render(function (err, css) {
		if (err) throw err
		console.log(css)
	})

console.log('----------------render end-------------------')
