var path = require('path')

function plugin(options = {}) {
	var namespace = options.namespace ? options.namespace : ''
	var elementSeparator = options.elementSeparator ? options.elementSeparator : '__'
	var modifierSeparator = options.modifierSeparator ? options.modifierSeparator : '--'
	var statePrefix = options.statePrefix ? options.statePrefix : 'is-'

	return function (stylus) {
		stylus.define('$namespace', namespace)
		stylus.define('$element-separator', elementSeparator)
		stylus.define('$modifier-separator', modifierSeparator)
		stylus.define('$state-prefix', statePrefix)
		stylus.include(__dirname)
	}
}

exports = module.exports = plugin

exports.version = require(path.join(__dirname, '../package.json')).version

exports.path = __dirname
